---
title: 'Welcome to My Blog!'
description: 'An introduction to my new blog and what you can expect.'
date: '2025-04-01'
categories:
  - general
published: true
---

<script>
  import Counter from './counter.svelte'
</script>

## Hello and Welcome!

I'm excited to launch my new blog where I'll be sharing my thoughts, experiences, and insights on technology, productivity, and personal growth. Stay tuned for engaging content!

```ts showLineNumbers {2} title="coba.ts"
function greet(name: string) {
  console.log(`Hey ${name}! 👋`);
}
```

```bash showLineNumbers title="shell"
fvm flutter pub global run intl_utils:generate &&
fvm flutter clean &&
fvm flutter pub get &&

afplay '/System/Library/Sounds/Ping.aiff' &&

echo 'Done!'
```

```dart showLineNumbers {2-3,6} title="main.dart"
class Spacecraft {
  String name;
  DateTime? launchDate;

  // Read-only non-final property
  int? get launchYear => launchDate?.year;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  // Method.
  void describe() {
    print('Spacecraft: $name');
    // Type promotion doesn't work on getters.
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

```json showLineNumbers {3-4,9,13,17} title="main.json"
{
  "menu": {
    "id": "file",
    "value": "File",
    "popup": {
      "menuitem": [
        {
          "value": "New",
          "onclick": "CreateNewDoc()"
        },
        {
          "value": "Open",
          "onclick": "OpenDoc()"
        },
        {
          "value": "Close",
          "onclick": "CloseDoc()"
        }
      ]
    }
  }
}
```

![alt text](/favicon.png)

<Counter />
