// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.commands.onCommand.addListener(function(command) {
  console.log('command: ', command);
  if (command == 'example_keyboard_command') {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });
  }
});
