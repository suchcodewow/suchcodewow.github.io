---
title: Cloud Hosted
description: 
parent: Step 1 (Pick 1)
---

What a magical place the cloud!

### Select your Cloud Hosting Provider

Separate instructions are provided below for Azure and AWS.  if you already know how to setup a virtual machine in your environment, check out the [Bring Your Own Host](1byoh) page for system requirements.

## Azure

### Log in to your Azure Portal

You'll need to have rights to create and modify virtual machines.

### Navigate to the create a virtual machine page

Select or search for virtual machines  
![Virtual Machines](/assets/images/azure_vm.jpg)

Select linux  
![Linux](/assets/images/azure_linux.jpg)

### Enter settings for your VM

For maximum bowl building compatibility, select:

- Ubuntu Server 20.04 LTS - Gen2
- At least 2vcpus & 4GB memory
- ensure you have a way to connect (port 22 for SSH) & password/key

Persistent storage is not required for a short term workshop.

### Connect and next steps

Login with your password or SSH key.  If successful, Congratulations!  You've completed step 1.  Check out next steps in building your bowl [here](./step2).

## AWS

### Login to AWS

You'll need permissions to create and modify EC2 instances.

### Launch a new instance.

Select or search for virtual machines.  
![Virtual Machines](/assets/images/aws_ec2.jpg)

Select launch instance.  
![Launch Instance](/assets/images/aws_launch.jpg)

Select a server size with 2+ vcpu and 4GB+ memory, review, and launch.

### Log in to your new EC2 instance
If you can log in to your new EC2 instance, Congratulations!  You've completed step 1.  Check out next steps in building your bowl [here](./step2).

## Recyling your bowl

For any of the cloud hosting options listed here, you can simply shut down & remove the vm.  After a period of inactivty, Dynatrace will archive the system automatically.