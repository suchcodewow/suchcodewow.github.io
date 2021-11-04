---
title: MicroK8sV2
description:
parent: Step 2 (kubernetes)
grand_parent: Kubernetes & Dynatrace Workshop
---

## microK8s

These steps will add microK8s kubernetes.  You should already have an ubuntu server running from [step 1](step1).

### Login to your ubuntu server

Login to your ubuntu computer.  
If you used **multipass**, login via `multipass shell DTkube`.

### install snap core

> **snap** is a standard ubuntu installer.  If you don't have it, check out the [snap docs](https://snapcraft.io/docs/installing-snapd?_ga=2.268412426.506881216.1628521158-685084332.1628085001){:target="_blank"}.

### Install microK8s

Install microk8s using snap.

```bash
sudo snap install microk8s --classic --channel=1.22/stable
```

> sudo
> snap
> channel/classic

### Join the microk8s group

Give your account access to microk8s.

```bash
sudo usermod -aG microk8s $USER
```

> usermod

Pick up the changes by logging out.

```bash
logout
```

And logging back in.  (Multipass was `multipass shell DTkube`.)

### Enable microk8s addons

```bash
microk8s enable dns ingress helm3
```

> dns
> warning about spec.template.annotations... blah blah blah.  Just say this is OK

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

Run the following command to export your kubernetes config.

```bash
microk8s config > ~/.kube/config
```

> You should not receive any errors.  If you get a permissions error, ensure that you added yourself to the group above & also logged out and back in to pick up that group.

### Quality of Life improvements <3

These commands are optional but make typing out commands easier.  Recommended for this workshop as commands later leverage these shortcuts.

```bash
sudo snap alias kubectl k
sudo snap alias microk8s.helm3 helm
```

> alias

## CHECKPOINT

Kubernetes should be running.  Use the following command to see what is running so far.  If you don't see 4 pods wait a minute or two and try again.  It can take just a bit for everything to start.

```bash
k get pods -A
```

> get
> what's a pod?
> what -A does
> calico pods
> nginx pod
> coredns

## Next Steps

If you saw pods running on your computer, congratulations!  Let's add **Dynatrace** for outstanding A.I. driven observability in the [next step](step3).

### Stop/Reset/Remove microk8s

To temporarily stop microk8s simply run the following command and wait a few seconds for a 'Stopped' message.

```bash
microk8s stop
```

To restart run the following and wait for a 'Started' message.

```bash
microk8s start
```

To reset microk8s to defaults (takes a few minutes):

```bash
microk8s reset
```

To remove microk8s, use the above reset command & then:

```bash
sudo snap remove microk8s
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
