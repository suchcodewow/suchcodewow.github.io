---
title: Dynatrace via kubectl
description:
parent: Step 4 (Pick 1)
grand_parent: Kubernetes & Dynatrace Workshop
---

## Dynatrace via kubectl

### :exclamation: Important Note

You'll see command line instructions on this step with multiple options depending on which kubernetes you picked in the previous step.  Select your distribution below:  

example:

```bash
kubectl get nodes
```

### Deploy Dynatrace

Create a namespace for Dynatrace.

```bash
kubectl create namespace dynatrace
```

Get the configuration for Dynatrace.

```bash
kubectl apply -f https://github.com/Dynatrace/dynatrace-operator/releases/latest/download/kubernetes.yaml
```

> The **apply** command in kubernetes creates and manages resources following a yaml file.  It's a common way to add & configure a number of components at once.

(Optional) Watch the deployment as it progresses.

```bash
kubectl -n dynatrace logs -f deployment/dynatrace-operator
```

> the **logs** command lets us watch the deployment as it rolls out.

### Connect to Dynatrace

Once the deployment is finished- use the API_TOKEN and PAAS_TOKEN you created in the [Prerequisites](index#prerequisites) to replace the values below.

```bash
kubectl -n dynatrace create secret generic dynakube --from-literal="apiToken=API_TOKEN" --from-literal="paasToken=PAAS_TOKEN"
```

> This command **creates** a new [secret](https://kubernetes.io/docs/concepts/configuration/secret/) named **dynakube** (used later!) that allows kubernetes to establish a connection to your Dyantrace tenant.

Next we need to configure options.  Download a template to follow:

```bash
curl -Lo cr.yaml https://github.com/Dynatrace/dynatrace-operator/releases/latest/download/cr.yaml
```

Edit the template:

```bash
nano cr.yaml
```

> Nano is a text editor built into Ubuntu.

Using arrow keys, navigate to the apiUrL line and update it as shown (replace x's with your ID)  
![API Setting](../assets/images/kubectl_api.jpg)

That's all we need to update for now.  If you're interested, you can check out all [parameters](https://www.dynatrace.com/support/help/technology-support/container-platforms/kubernetes/monitor-kubernetes-environments/#anchor_parameters).

Save with *ctrl+x*, *Y* for yes, and *enter* to overwrite the template.

Awesome!  Almost there.  Now we need to apply our customization:

```bash
kubectl apply -f cr.yaml
```

### Next Steps

Now that you have Dynatrace connected to kubernetes, check out the demo applications and showcases you can deploy in [step 5](step5).

### Throwing out this ingredient

If you want to recycle this ingredient for any reason, simply follow the two steps below.

Remove the component you installed.

```bash
kubectl delete -n dynatrace dynakube --all
```

and run the delete command to reverse the apply command.

```bash
kubectl delete -f https://github.com/Dynatrace/dynatrace-operator/releases/latest/download/kubernetes.yaml
```

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
