---
title: MicroK8s
description:
parent: Step 2 (Pick 1)
grand_parent: Kubernetes & Dynatrace Workshop
---

## microK8s

These steps will add microK8s kubernetes to your bowl.  You should already have an ubuntu 20.04 server running from [step 1](step1).

### Login to your ubuntu server

Login to your ubuntu computer.  
If you used **multipass**, login via `multipass shell DTkube`.

### Install microK8s

```bash
sudo snap install microk8s --classic
```

> snap is a standard ubuntu installer.  If you don't have it, check out the [snap docs](https://snapcraft.io/docs/installing-snapd?_ga=2.268412426.506881216.1628521158-685084332.1628085001){:target="_blank"}.
> The command above installs microK8s.

### :checkered_flag: CHECKPOINT

Run `sudo microk8s kubectl get nodes` and hang tight until you see a 'ready' response for your control-plane.

### Create namespaces

We'll create a few namespaces to organize kubernetes.  We'll use these over the upcoming steps to keep everything tidy.

```bash
sudo microk8s kubectl create ns cert-manager
sudo microk8s kubectl create ns cow-herder
```

### :checkered_flag: CHECKPOINT

Take a moment to revel in the glory of your organization with `sudo microk8s kubectl get ns` to see the spaces you've setup.  You'll see several system-generated namespaces in there along with the ones you've created.

### Next Steps

If kubernetes is up and running, Congratulations!  You're well on your way to a full-featured installation.  Let's add **Rancher** in [Step 3](step3).

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
