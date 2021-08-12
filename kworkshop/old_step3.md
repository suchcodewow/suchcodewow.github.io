---
title: Step 3 (Rancher)
description: Install Rancher
parent: Kubernetes & Dynatrace Workshop
nav_exclude: true
---

## Install Rancher

Rancher is an orchestration system for kubernetes.  It provides a UI on top of whichever installation of kubernetes you have & gives you a unified way to make changes and see what you have running.  

### Create namespaces

We'll create a few namespaces to organize kubernetes.  We'll use these over the upcoming steps to keep everything tidy.

```bash
kubectl create ns cert-manager
kubectl create ns cow-herder
```

### :checkered_flag: CHECKPOINT

Take a moment to revel in the glory of your organization with `kubectl get ns` to see the spaces you've setup.  You'll see several system-generated namespaces in there along with the ones you've created.

### :exclamation: Important Note

You'll see command line instructions on this step with multiple options depending on which kubernetes you picked in the previous step.  Select your distribution below:  

example:

```bash
kubectl get nodes
```

## Install Prerequisites

### Install Helm

```bash
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

> Helm is a widely used package manager for Kubernetes.
> It uses the term 'charts' for packages.  It's corny, but fun.  Feel free to add on to the mood with your own nautical reference or exclamation at any point.

### Update Helm Repo

We need to update helm so it knows about a couple of packages we'll install.  Then tell Helm to update.

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
helm repo update
```

>- repo add tells helm to add the following repositories (repos).  
>- The following name is a name we assign to refer to the repository (repo) later.  
>- The URL tells Helm where to download.  
>- repo update tells Helm to go to his room and think about why he didn't come pre-loaded with such critical charts.  And then when it's ready, to come back downstairs and tell his sister that he's sorry for wasting his her time making her run these commands over and over again.  

:memo: You can run `helm repo list` to see all of applications helm currently knows about.

### Install cert-manager

```bash
helm install \
cert-manager jetstack/cert-manager \
--namespace cert-manager \
--create-namespace \
--version v1.3.1 \
--set installCRDs=true
```

>- We tell helm to **install** followed by a repo name.
>- Then we specify which 'chart' we want to use from the repo.  One repository can store many charts.
>- **namespace** tells Helm to add this to the cert-manager namespace.
>- **version** allows us to specify a specific chart version.
>- **set** specifies additional options for Helm to process (not always needed).

### :checkered_flag: CHECKPOINT

Confirm it worked with `kubectl get pods -n cert-manager`.  Looking for a *running* status.

>- It might take a bit for Helm to deploy everything.
>- If you see an error message or if your computer spontaneously catches fire... there is a chance something went wrong.  *SuchCodeWow and its affiliates are not responsible for any damage to computer equipment, personal property, or pets both domestic & exotic*

:memo: It makes a lot of sense to think dropping the namespace part (-n xx) from the command would be a quick way to simply show everything.  If you are thinking that- You're awesome!  You can make good inferences and employee logic effectively.  Too bad you're completely, utterly wrong.  Kubernetes doesn't have time for logic or making any sense.  You have to use `kubectl get pods -A` to show everything.  Don't stress it when you miss the -A and wonder why all of your work so far disappeared!

## Install Rancher ( yeehaw! )

If you were feeling rebellious earlier and used a different DNS name in the hosts file, remember to replace the default here.

```bash
helm install rancher rancher-latest/rancher \
--namespace cow-herder \
--set hostname=rancher.localdev
```

### :checkered_flag: CHECKPOINT

you can watch the deployment of Rancher with `kubectl -n cow-herder rollout status deploy/rancher`.  Hang tight moving forward until it's finished.

Check that the ingress has been setup.  Run `kubectl -n cow-herder get ingresses`.

Look for *deployment "rancher" successfully rolled out*.

>- Setting the **hostname** parameter gives rancher a home address.
>- **ingress** is a term for an external route into your kubernetes environment.  An ingress can handle any number of routing rules and distribute traffic for any number of application types.
>- **traefik** is the default ingress controller with k3s.  There are a variety of other options like nginx, F5, and offerings from cloud providers.  Checking out some of them are great next steps after you build your bowl.

### :checkered_flag: CHECKPOINT

Navigate to [http://rancher.localdev](http://rancher.localdev){:target="_blank"} in your browser.  Pick an admin password and, for simplicity, you can check the box on the right indicating this will be the only cluster managed.

Your cluster dashboard should reflect a graphic view of what we've built today.  You can click on any of the boxes to see what's running.  You may need to find the namespaces option at the top and change your scope.  
![Namespaces](/assets/images/rancher_namespace_dropdown.jpg)

### Next Steps

If you have rancher running & can view the objects in your environment- that's awesome!  You're doing an outstanding job.  You've got a real, usable kubernetes system running that you built YOURSELF!

Cut out the star below, pin it to your shirt, and check out how easily Dynatrace can be added to your environment to provide unparalleled monitoring and observability in [step 4](step4).  
![gold star](../assets/images/gold_star.jpg)

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
