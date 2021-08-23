---
title: Dynatrace via Helm
description:
parent: Step 4 (Dynatrace)
grand_parent: Kubernetes & Dynatrace Workshop
---

## Dynatrace via Helm

We'll install Dynatrace via a Helm chart in this step.

### Install Dynatrace

Install Dynatrace Operator via the rancher UI.  Select Apps & Marketplace top left:  
![Apps](/assets/images/rancher_apps.jpg)  

Search for *dynatrace* in the search box  
![search](/assets/images/rancher_search_dynatrace.jpg)  

select the operator chart  
![dtoperator](/assets/images/dynatrace_chart.jpg)  

click "agent configuration" and apply the URL and tokens you created in the pre-requisites  
![settings](/assets/images/dynatrace_settings.jpg)  

then install.  
![settings](/assets/images/dynatrace-install.jpg)  

Installation will take several minutes.  It's a great time to stretch and exercise while you wait for a SUCCESS message.  
![workout](/assets/images/workout.jpeg)  

When the installation is done you can close the output screen with the small x.  
![Close Button](/assets/images/helm_finish.png)

## :checkered_flag: CHECKPOINT

Confirm Dynatrace Operator connected to your installation.  In your tenant go to *deployment status*.  
![deployment status](/assets/images/status.png)  

Your host will appear in the deployment list.  
![host](/assets/images/DTdeploy.png)

## Next Steps

If Dynatrace installed successfully- perfect!  That's all it takes to add intelligent, A.I. driven observability in kubernetes.  Dynatrace will automatically add monitoring to anything that starts up and gracefully remove monitoring when the resource shuts down.  

With your Dyntrace-empowered Kubernetes installation, try out topping off your bowl with one of the examples in [step 5](step5)!
