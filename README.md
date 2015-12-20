# ipcamjs
Generic ipcamera patrol system controller

API based on Promise Javascript concept.
A basic usage example could be:

presetCmd().then(slowCmd).then(rightCmd).then.(stopRightCmd).then(leftCmd).then(stopLeftCmd).done();
