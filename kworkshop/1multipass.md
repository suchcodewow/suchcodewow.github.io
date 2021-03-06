---
title: Multipass
description: Step 1 Multipass
parent: Step 1 (host)
grand_parent: Kubernetes & Dynatrace Workshop
---

## Multipass

### Download and Install **Multipass** using the defaults

[Download on MAC](https://multipass.run/download/macos) or  [Download on PC](https://multipass.run/download/windows)

> **Multipass** lets us run a virtual Ubuntu Linux server locally.

### Launch a new Ubuntu Server

Open a new terminal window on your computer.  Then run:

```bash
multipass launch -c 4 -m 4G -d 64GB -n DTkube
```

> This creates an ubuntu server that can use 4 cores, 4 GB of memory, and is named DTkube.  
> The `-d 64GB` command allocates maximum hard disk size.  Multipass will only use space consumed by the ubuntu server's files & you won't actually use up 64GB of space on your computer.

### Get the IP address of your new server

```bash
multipass info DTkube
```

>Name: DTkube  
>State: Running  
>IPv4: **192.168.x.x** (this)

:memo:   You can run `multipass list` to show all servers.

### Add this IP address to your hosts file

Open your hosts file and add *rancher.localdev* with the IP.  (Replace x's with actual IP from previous step)

Hosts file example:

>192.168.1.1 server1  
>192.168.1.2 server2  
>**192.168.x.x rancher.localdev**

### Log in to the server

Connect to your new ubuntu server.

```bash
multipass shell DTkube
```

> Multipass automatically creates an account named *ubuntu* for you and logs in with this account automatically.  You won't need a password when using *sudo*.  
> **sudo** is a way to preface commands in linux that elevates your permission to root (administrator) level temporarily.

### (Recommended) Update your new server

```bash
sudo apt-get update -y
sudo apt upgrade -y
```

## Choose your next ingredient

Congratulations!  You've completed step 1.  Check out next steps in building your bowl [here](./step2).

### Recycling your bowl

If you need to take a break from building your bowl, you can simply shut down this lab's virtual machine with `multipass stop DTkube`.  
Restart later with `multipass start Dtkube`.

If you want to remove your server for any reason (to restart and build a different bowl):

Shut down your server.

```bash
multipass stop DTkube
```

Delete the server.

```bash
multipass delete DTkube
```

If you want to immediately destroy all evidence of your host (most frequently used when you embarassingly mess up something and want the evidence gone instantly) you can purge the resources so the server can't be recovered.

```bash
multipass purge
```

if you are ready to completely recycle your bowl and recover all resources simple uninstall Multipass.  

- In windows, use Add/Remove Programs.  
- On Mac, you can use:

```bash
sudo chmod 755 "/Library/Application Support/com.canonical.multipass/uninstall.sh"
sudo "/Library/Application Support/com.canonical.multipass/uninstall.sh"
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
