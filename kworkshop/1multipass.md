---
title: Multipass
description: Step 1 Multipass
parent: Step 1 (Pick 1)
grand_parent: Kubernetes & Dynatrace Workshop
---

## Multipass

### Download and Install **Multipass** using the defaults

[Download on MAC](https://multipass.run/download/macos) [Download on PC](https://multipass.run/download/windows)

> **Multipass** lets us run a virtual Ubuntu Linux server locally.

### Get the IP address of your new server

```bash
multipass info DTkube
```

>Name: DTkube  
>State: Running  
>IPv4: **192.168.x.x** (this)

:memo:   You can run `multipass list` to show all servers.

### Add this IP address to your hosts file

Use something like the alias *rancher.localdev*.  (Replace x's with actual IP from step 3)

Hosts file example:

>192.168.1.1 server1  
>192.168.1.2 server2  
>**192.168.x.x rancher.localdev**

### Choose your next ingredient

Congratulations!  You've completed step 1.  Check out next steps in building your bowl [here](./step2).

### Recycling your bowl

If you need to take a break from building your bowl, you can simply shut down this lab's virtual machine with `multipass stop DTKube`.

if you are ready to completely recycle your bowl, you can uninstall Multipass and remove everything.  In windows, use Add/Remove Programs.  On Mac, you can use:

```bash
sudo chmod 755 "/Library/Application Support/com.canonical.multipass/uninstall.sh"
sudo "/Library/Application Support/com.canonical.multipass/uninstall.sh"
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
