---
title: Dynatrace via Helm
description:
parent: Step 4 (Dynatrace)
grand_parent: Kubernetes & Dynatrace Workshop
---

### Install Dynatrace

Install Dynatrace Operator via the rancher UI.  Select Apps & Marketplace top left:  
![Apps](/assets/images/rancher_apps.jpg)  

Search for *dynatrace* in the search box  
![search](/assets/images/rancher_search_dynatrace.jpg)  

select the operator chart  
![dtoperator](/assets/images/dynatrace_chart.jpg)  

click "agent configuration" and apply the URL and tokens you created in the pre-requisites  
![settings](/assets/images/dynatrace_settings.jpg)  

then install  
![settings](/assets/images/dynatrace-install.jpg)  

and take a quick break to stretch and exercise while you wait for a SUCCESS message.  
![workout](/assets/images/workout.jpeg)

### Next Steps

If Dynatrace installed successfully- perfect!  That's all it takes to add intelligent, A.I. driven observability in kubernetes.  Dynatrace will automatically add monitoring to anything that starts up and gracefully remove monitoring when the resource shuts down.  

With your Dyntrace-empowered Kubernetes installation, try out topping off your bowl with one of the examples in [step 5](step5)!
