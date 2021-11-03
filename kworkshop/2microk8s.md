---
title: MicroK8s
description:
parent: Step 2 (kubernetes)
grand_parent: Kubernetes & Dynatrace Workshop
---

## microK8s

These steps will add microK8s kubernetes to your bowl.  You should already have an ubuntu server running from [step 1](step1).

### Login to your ubuntu server

Login to your ubuntu computer.  
If you used **multipass**, login via `multipass shell DTkube`.

### install snap core

```bash
sudo snap install core
```

> **snap** is a standard ubuntu installer.  If you don't have it, check out the [snap docs](https://snapcraft.io/docs/installing-snapd?_ga=2.268412426.506881216.1628521158-685084332.1628085001){:target="_blank"}.

### Install microK8s

Install microk8s using snap.

```bash
sudo snap install microk8s --classic
```

Create a folder to save your KUBE config.

```bash
mkdir ~/.kube
```

> The ~ tells linux to add the kube folder to your home directory.  Kubernetes will look here as a default location for your configuration later.

### Setup Kubernetes

Grant your account access to microk8s.

```bash
sudo usermod -a -G microk8s $USER
```

> This command adds your account `$USER` to the kubernetes permissions group.  
> To pick up these changes, `logout` of ubuntu and log in again.

### Microk8s addons

Enable key addons.

```bash
microk8s.enable ingress dns registry storage helm3
```

### Setup shortcuts

Create an alias for kubectl.

```bash
sudo snap alias microk8s.kubectl kubectl
sudo snap alias microk8s.kubectl k
sudo snap alias microk8s.helm3 helm
```

> `alias` gives you shortcuts to commonly used commands. 
> `kubectl` is the main tool used to make changes in kubernetes.
> `helm` is a popular orchestration tool for kubernetes.

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

Run the following command to export your kubernetes config.

```bash
microk8s config > ~/.kube/config
```

> You should not receive any errors.  If you get a permissions error, ensure that you added yourself to the group above & also logged out and back in to pick up that group.

Then use this command to test that kubernetes installed and is able to find your config.

```bash
kubectl get nodes -A
```

> You should get a response from kubernetes that your environment is in a Ready status.  If you get an error about contacting the server- check that you successfully exporting your kube config.

Set permissions to allow your account only (this prevents security warnings later).

```bash
sudo chmod -R 700  ~/.kube
```

>- **chmod** changes permissions for a folder.
>- **-R** flag will update permissions for the folder and anything it contains.  (Just in case there was anything in that folder.)
>- **700** tells linux to give you full control and remove access at the group and everyone levels.

## Next Steps

If kubernetes is up and running, Congratulations!  You're well on your way to a full-featured installation.  Let's add **Rancher** in [Step 3](step3).

### Recycling this ingredient

Run the commands below to remove kubernetes.

```bash
microk8s reset
```

```bash
sudo snap remove microk8s
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
