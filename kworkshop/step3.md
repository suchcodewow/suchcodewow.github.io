---
title: Dynatrace Installation
description:
parent: Kubernetes & Dynatrace Workshop
---

## Intro

We'll leverage your Dynatrace tenant to quickly and easily configur the Dyantrace Software Intelligence Platform in your new kubernetes cluster.

If you don't have Dynatrace yet, [sign up for a free trial here](http://www.dynatrace.com/trial).  Setup takes a brief couple of minutes.  Return here when ready to continue.

### Create a configuration file for Dynatrace

Log in to your Dynatrance tenant, [optional] search for *deploy dynatrace* (green arrow), and click *deploy dynatrace* (blue arrow).

![search](/assets/images/deploy.jpg)

Click *start installation* in the main window.

![start](/assets/images/start.jpg)

Select *kubernetes* from the oneagent deployment options.

![kubernetes](/assets/images/kubernetes.jpg)

1. Give the configuration a name (green arrow).
2. Click *create tokens* (red arrow) or [optional] create an [API](https://www.dynatrace.com/support/help/get-started/access-tokens/#create-api-token) and [PAAS](https://www.dynatrace.com/support/help/get-started/access-tokens/#paas-token) token to paste into these fields.
3. click the *copy* button (blue arrow).

![kube_config](/assets/images/kube_config.jpg)

Paste the command into your terminal window and run it.  When done the script will respond with something similar to this:

![kube_done](/assets/images/kube_done.jpg)

## Remove Dynatrace

Simply removing the dynatrace namespace will completely remove everything done in this step.

```bash
k delete namespace dynatrace
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
