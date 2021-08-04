---
title: Kubernetes & Dynatrace Workshop
has_children: true
---

### About

Inspired by "create your own bowl" restaurants- this ~modular Kubernetes workshop gives you the flexibility to create a production-grade platform with minimal dependencies capable of running, scaling, and demoing the power of Dynatrace!  
![bowl overview](../assets/images/bowl.png)

### Prerequisites

- Computer with 8GB RAM & 4+ virtual CPU's
- A dynatrace tenant API URL (https://*yourtenant*.live.dynatrace.com/api)
- An [API token](https://www.dynatrace.com/support/help/reference/dynatrace-concepts/access-tokens/#anchor_create-api-token) with at least "access problem feed", "metrics", and "topology" settings
- A [Paas token](https://www.dynatrace.com/support/help/reference/dynatrace-concepts/access-tokens/#anchor_paas-token)

### Workshop Summary

From scratch, we'll build a virtual unbuntu server running Kubernetes.  We'll install Dynatrace via the helm chart, add a small application, and see how self-healing proactively fixes problems.  These colored boxes will provide checkpoints along the way.  
Instructions are provided at the end to remove everything installed during the exercise.
{:.notice--info}

<!-- language: lang-js -->

    code blocks like this are meant to be typed (or copied with button)  
    and pasted into your command line.  Except this one.  
    I mean, you CAN copy this block, but there's no point.  
    You know what... you do you.  Copy away if it brightens your day.

### Environment Setup

1. Download and Install **Multipass**.  
[Download on MAC](https://multipass.run/download/macos)  
[Download on PC](https://multipass.run/download/windows)

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    -<span style="color:rgb(63,134,145);font-style:bold">Multipass</span> lets us run a virtual Ubuntu Linux server locally.<br> 
    -Install using default values.
    </details>


1. Create a multipass server.
   
    <!-- language: lang-js -->

        multipass launch --name DTkube --cpus 4 --mem 4g --disk 20g

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    -<span style="color:rgb(63,134,145);font-style:bold">launch</span> creates and starts up a new server with the parameters given.<br>
-<span style="color:rgb(63,134,145);font-style:bold">name</span> any valid name (make a note if you change- used later)<br>
-<span style="color:rgb(63,134,145);font-style:bold">cpus</span> virtual CPU's (< 4 can cause issues)<br>
-<span style="color:rgb(63,134,145);font-style:bold">mem</span> memory (< 4 can cause issues)<br>
-<span style="color:rgb(63,134,145);font-style:bold">disk</span>  large to be safe- vm won't allocate unless needed<br>
    </details>

1. Get the IP address of your new server.
   
    <!-- language: lang-js -->

        multipass info DTkube



    >Name: DTkube  
    >State: Running  
    >IPv4: **192.168.x.x** (this)

    You can run *multipass list* to show all servers you own.
    {:.notice--info}

1. Add this IP address to your hosts file with alias *rancher.localdev*.  (Replace x's with actual IP from step 3)
    
    Hosts file example:

    >192.168.1.1 server1  
    >192.168.1.2 server2  
    >**192.168.x.x rancher.localdev**
1. Login to your local ubuntu server.
    <!-- language: lang-js -->

        multipass shell DTkube
1. Install k3s kubernetes.

    <!-- language: lang-js -->

        curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    -<span style="color:rgb(63,134,145);font-style:bold">k3s</span> is a lightweight, production grade kubernetes distribution.<br>-The <span style="color:rgb(63,134,145);font-style:bold">curl command</span> downloads k3s & <span style="color:rgb(63,134,145);font-style:bold">sh -</span> executes the installer.<br>-The<span style="color:rgb(63,134,145);font-style:bold"> K3S_KUBECONFIG_MODE </span>install option makes the kube config file accessible to non-admins.  It's a shortcut for this workshop and wouldn't be used in production.  You'll see a couple of warnings about this later- but for a lab environment it's just fine.
    </details>

1. Export the KUBECONFIG environment variable so kubernetes knows where to find your configuration.

    <!-- language: lang-js -->

        export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
1. Install Kubecontrol.

    <!-- language: lang-js -->

        curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    <span style="color:rgb(63,134,145);font-style:bold">kubecontrol</span> is the controller manager for kubernetes.  We'll use it through the workshop for adding/changing the kubernetes installation.  Similar to before, curl downloads the software and launches a bash shell for installation. 
    </details>

    Checkpoint: run *kubectl get nodes* and ensure you see a 'ready' response for your control-plane.  If you get an error, it's typically a miss on step #7.
    {:.notice--info}
1. Create some namespaces to organize kubernetes.  We'll use these over the upcoming steps.  
    <!-- language: lang-js -->

        kubectl create ns cert-manager

    <!-- language: lang-js -->

        kubectl create ns cow-herder

    Checkpoint: take a moment to revel in the glory of your organization with *kubectl get ns* to see the spaces you've setup.  You'll see several system-generated namespaces in there along with the ones you've created.
    {:.notice--info}

1. Install Helm.

    <!-- language: lang-js -->

        curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    <span style="color:rgb(63,134,145);font-style:bold">Helm</span> is a widely used package manager for Kubernetes.  It uses the term 'charts' for these packages with you at the HELM.  It's corny, but fun.  Feel free to add on to the mood with your own nautical reference or exclamation at any point.
    </details>

1. Update Helm's repository so it knows about a couple of packages we'll install.  Then tell Helm to update.

    <!-- language: lang-js -->

        helm repo add jetstack https://charts.jetstack.io

    <!-- language: lang-js -->

        helm repo add rancher-latest https://releases.rancher.com/server-charts/latest

    <!-- language: lang-js -->

        helm repo update

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    -<span style="color:rgb(63,134,145);font-style:bold">repo add</span> tells helm to update it's library of known packages with these parameters.<br>
    -The name after 'add' is the name we're assigning to the package.<br>
    -The URL is the location of the package information.<br>
    -<span style="color:rgb(63,134,145);font-style:bold">repo update</span> is the command to tell Helm to go to his room and think about all of the  packages it should know about without having to tell him.  And then when it's ready, to come back downstairs and tell his sister that he's sorry for not even knowing where to find cert manager.
    </details>

    You can run *helm repo list* to see all of applications helm currently knows about.
    {:.notice--info}

1. Install cert-manager.

    <!-- language: lang-js -->

        helm install \
        cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --create-namespace \
        --version v1.3.1 \
        --set installCRDs=true
    
    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    After 'install' command we give Helm the name of the repo.<br>
    Then we specify which 'chart' we want to use from the reop.  One repository can store many charts.<br>
    <span style="color:rgb(63,134,145);font-style:bold">namespace</span> tells Helm to add this to the cert-manager namespace we created earlier. <br>
     <span style="color:rgb(63,134,145);font-style:bold">version</span> allows us to specify a specific known version of the package we want to use.<br>   
    <span style="color:rgb(63,134,145);font-style:bold">set</span> specifies additional options for Helm to process.  In this case, cert-manager has some custom resources outside the package.  We tell Helm to get those out of the way now.
    </details>

    Checkpoint: Confirm it worked with *kubectl get pods -n cert-manager*.  Running is the status we hope for.  It might take a bit for Helm to deploy everything.  But if you see an error msg, stopped msg, or if your laptop catches fire- something probably went wrong.
    {:.notice--info}

    It makes a lot of sense to think dropping the namespace part (-n xx) from the command would be a quick way to simply show everything.  If you are thinking that- You're awesome!  You can make good inferences and employee logic effectively.  Too bad you're completely, utterly wrong.  Kubernetes doesn't have time for logic or making any sense.  You have to use *kubectl get pods -A* to show everything.  Don't stress it when you miss the -A and wonder why all of your work so far disappeared!
    {:.notice--warning}

1. Install Rancher.  ( yeehaw! )  If you were feeling rebellious earlier and used a different DNS name in the hosts file, remember to replace the default here.

    <!-- language: lang-js -->

        helm install rancher rancher-latest/rancher \
        --namespace cow-herder \
        --set hostname=rancher.localdev

    Checkpoint: you can watch the deployment of Rancher with *kubectl -n cow-herder rollout status deploy/rancher*.  Hang tight moving forward until it's finished.
    {:.notice--info}

    Checkpoint: Check that the ingress has been setup.  Run *kubectl -n cow-herder get ingresses*.
    {:.notice--info}

    Look for:
    >deployment "rancher" successfully rolled out

    <details><summary><span style="color:rgb(63,134,145);font-style:bold">Details</span></summary>
    <span style="color:rgb(63,134,145);font-style:bold">Rancher</span> is a popular open-source orchestration platform for kubernetes.  It handles operations of your kubernetes environment and provides a browser based experience for management.<br>
    Setting the hostname parameter lets rancher know it's home DNS entry.<br>
     <span style="color:rgb(63,134,145);font-style:bold">ingress</span> is a term for routes outside of the kubernetes environment to reach your cluster.  An ingress can handle any number of routing rules and distribute traffic to any number of services.<br>
    <span style="color:rgb(63,134,145);font-style:bold">Traefik</span> is the default ingress controller with k3s.  There are a variety of other options like nginx, F5, and offerings from cloud providers.
    </details>

### Using Kubernetes
1. Navigate to [http://rancher.localdev](http://rancher.localdev){:target="_blank"} in your browser.  Pick an admin password and, for simplicity, you can check the box on the right indicating this will be the only cluster managed.

    Checkpoint: Your cluster dashboard should reflect a graphic view of what we've built today.  You can click on any of the boxes to see what's running.  You may need to find the namespaces option at the top and change your scope.  
    ![Namespaces](/assets/images/rancher_namespace_dropdown.jpg)
    {:.notice--info}


1. Install Dynatrace via the rancher UI.  Select Apps & Marketplace top left:
     
    ![Apps](/assets/images/rancher_apps.jpg)  

    Search for *dynatrace* in the search box  

    ![search](/assets/images/rancher_search_dynatrace.jpg)  

    select the operator chart  

    ![dtoperator](/assets/images/dynatrace_chart.jpg)  

    click "agent configuration" and apply the URL and tokens you created in the pre-requisites  

    ![settings](/assets/images/dynatrace_settings.jpg)  

    then install  

    ![settings](/assets/images/dynatrace-install.jpg)  
    
    and take a quick break to stretch and exercise while you wait for a SUCCESS message.  

    ![workout](/assets/images/workout.jpeg)

With your Dyntrace-empowered Kubernetes installation, there are virtually endless configurations you can apply!  Check out the links below for further walk throughs to setup a working environment based on your goals.

- [Install a sample application with virtual user traffic](./sample.md)  Watch Dynatrace track everything!
- [Reset a broken service with Ansible](./ansible.md) when Dynatrace pinpoints it as the root cause of problems.
- [Trigger a workflow through Harness](./harness.md) in Jenkins to rollback a deployment that causes errors.




<script src="{{ base.url | prepend: site.url }}/assets/js/code.js"></script>

