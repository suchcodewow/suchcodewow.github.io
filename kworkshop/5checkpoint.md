---
title: Kubernetes Readiness Checkpoint
description:
parent: Step 5 (Pick Any)
grand_parent: Kubernetes & Dynatrace Workshop
---

## Checkpoint

Run through the steps below to deploy a simple frontend application and confirm that you can connect to your environment.

### Deploy helloworld application

Create a namespace.

```bash
kubectl create ns helloworld
```

Deploy an application.

```bash
kubectl -n helloworld create deploy helloapp --image=shinojosa/kiab:0.8
```

> The `deploy` function groups a set of pods around a common application or purpose.
> `--image=` tells kubernetes what to deploy.

Tell the deployment to respond on port 80.

```bash
kubectl -n helloworld expose deploy helloapp --port=80 --type=NodePort
```

Create a host alias ingress yaml.

```bash
cat > hello-ingress.yaml << EOL
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello-ingress
  namespace: helloworld
spec:
  rules:
  - host: helloworld.192.168.1.118.nip.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: helloapp
            port:
              number: 80
EOL
```

> Kubernetes can read this yaml file to configure many components.  
> `kind: Ingress` tells Kubernetes we're creating an ingress.  Nginx watches for these and automatically sets up configuration.  
> `name: helloworld-ingress` sets the name of this ingress to helloword.  Can be anything.  
> `namespace: helloworld` sets the namespace.  Can be anything.
> `serviceName: helloworld` 

<script src="{{ base.url | prepend: site.url }}/assets/js/copy.js"></script>
