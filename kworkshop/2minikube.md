---
title: MiniKube
description:
parent: Step 2 (kubernetes)
grand_parent: Kubernetes & Dynatrace Workshop
nav_exclude: true
---

## minikube

These steps will add minikube kubernetes to your bowl.  You should already have an ubuntu 20.04 server running from [step 1](step1).

### Login to your ubuntu server

Login to your ubuntu computer.  
If you used **multipass**, login via `multipass shell DTkube`.

### Install minikube

download minikube.

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

Install.

```bash
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Install supporting components for the docker engine.

```bash
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y
```

> Minikube does not come with a container driver.  We're using docker here to provide that hardware interface layer for minikube.  There are several other options listed in the [minikube docs](https://minikube.sigs.k8s.io/docs/start/).

Add the GPG key for docker.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

> A GPG key is a way for organization to sign and encrypt their software.  We'll need it in the next step.

Add docker's repositories to your apt package index.

```bash
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

> This ridiculous looking command simply associates the key we downloaded before to the URL apt should use.  
> The **sudo tee** command says to add the previous text to the apt sources file.  It simply appends text to an existing text file.  
> **dev/null** just means to forego any messages in response on the screen to keep things tidy.

Update apt to pickup the new repositories.

```bash
sudo apt-get update
```

Install docker and friends.

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io -y
```

Add your account to the docker group so you can use it.

```bash
sudo usermod -aG docker $USER
```

Log out of Ubuntu with `logout` and log in again to pick up your new group.

## :checkered_flag: CHECKPOINT

Start minikube.

```bash
minikube start
```

If it doesn't work, check the suggestions provided.  Most often, it's because you didn't successfully deploy docker or did not log out and back in after adding yourself to the docker group.

### Install kubectl

Download kubectl.

```bash
curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl
```

Install.

```bash
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

> kubecontrol is the controller manager for kubernetes.  We'll use it through the workshop for adding/changing the kubernetes installation.  Similar to before, curl downloads the software and launches a bash shell for installation.  

## :checkered_flag: CHECKPOINT

Use this command to test that kubernetes installed and is able to find your config.

```bash
kubectl get nodes -A
```

> You should get a response from kubernetes that your environment is in a Ready status.

### Next Steps

If kubernetes is up and running, Congratulations!  You're well on your way to a full-featured installation.  Let's add **Rancher** in [Step 3](step3).

### Recycling this ingredient

To remove minikube:

```bash
minikube stop
minikube delete
rm -r ~/.kube ~/.minikube
sudo rm /usr/local/bin/localkube /usr/local/bin/minikube
systemctl steop '*kubelet*.mount'
sudo rm -rf /etc/kubernetes/
```

Remove docker:

```bash
docker system prune -af --volumes
sudo apt-get purge docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/llib docker /var/lib/containerd
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
