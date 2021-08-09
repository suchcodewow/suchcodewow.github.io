var codeBlocks = document.querySelectorAll('pre.highlight');

codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = 'copy';

  codeBlock.append(copyButton);

  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    copyButton.innerText = 'Copied';
    var fourSeconds = 4000;

    setTimeout(function () {
      copyButton.innerText = 'Copy';
    }, fourSeconds);
  });
});

var distroLoc = Array.prototype.slice.call(document.querySelectorAll('p')).filter(function (el) {
  return el.textContent.includes('Select your distribution')})[0];

var distros = ["k3s","microk8s","minikube"];
var replacements = distros.concat("[select distribution above]");

distros.forEach(function (distro) {
  var distroButton = document.createElement('button');
  distroButton.className = distro;
  distroButton.type = 'button';
  distroButton.ariaLabel = 'Change codeblock distribution';
  distroButton.innerText = distro;

  distroLoc.append(distroButton);
  distroLoc.parentNode.insertBefore(distroButton, distroLoc.nextSibling);

  distroButton.addEventListener('click', function () {
    var codeSnips = document.querySelectorAll('code');
    codeSnips.forEach(function (codeSnip) {
      replacements.forEach(function (replacement) {
        codeSnip.innerText = codeSnip.innerText.replaceAll(replacement, distro);
      });
    });
  });

});