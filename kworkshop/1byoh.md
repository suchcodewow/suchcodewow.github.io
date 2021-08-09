---
title: Bring Your Own Host
description:
parent: Step 1 (Pick 1)
grand_parent: Kubernetes & Dynatrace Workshop
---

### Ensure your host meets these prerequisites

Hey!  You have your own server.  Cool!  To work with all of steps in building your bowl, please make sure it meets the following criteria:

- It's running a modern Linux kernel.
- It has sufficient resources (recommended 4+ cores and 4GB+ memory).
- It has at least 16GB of free space.
- It can reliably connect to the internet.

If you don't meet these prequisites, you could try either [Multipass](./1multipass) if your PC is fairly new- or try the [cloud hosted](./1cloud) option.

### Create a hosts entry for Rancher

We'll use rancher in a later step and installation uses a DNS entry.  Add an entry to your computer's host file to use later.

> Example host file:

### Add your server's IP address to your hosts file

Open your hosts file and add *rancher.localdev* with the IP.  (Replace x's with the IP address of your ubuntu server)

Hosts file example:

>192.168.1.1 server1  
>192.168.1.2 server2  
>**192.168.x.x rancher.localdev**

### Choose your next ingredient

With your own server ready to go, check out next steps in building your bowl [here](./step2).
