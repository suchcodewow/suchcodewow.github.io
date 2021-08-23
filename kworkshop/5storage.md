---
title: Storage (Pick Any)
description:
parent: Step 5 
grand_parent: Kubernetes & Dynatrace Workshop
---

## About Storage

Kubernetes is designed to easily spin up resources and replace the existing ones.  Whenever we recreate or replace pods all of the data is reset- wiping out all data written after the last deployment.  While generally positive, we must have a way to save (persist) the things we do want to save.  For example, if our application stores orders and customer info in a SQL database, we wouldn't want to reset the database each time we recreate the application pod with a newer version of our application software.

### How Kubernetes handles storage

Kubernetes has the ability to create persistent volumes.  However, these are simply 'pointers' to real volumes on the hardware.  And it's best practice to provision the real storage outside of Kubernetes itself in case the cluster crashes.  There are many ways to implement persistent storage but for simplicity in this workshop, we'll use a basic implementation.

### Adding a persistent volume

sudo apt-get install nfs-kernel-server -y

sudo mkdir -p /nfs

sudo chown nobody:nogroup /nfs