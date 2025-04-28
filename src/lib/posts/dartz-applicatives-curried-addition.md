---
title: 'Combining Curried Functions with Dartz Applicatives'
description: "Learn how to apply curried functions using Dartz's applicative functor in Dart."
date: '2025-04-20'
categories:
  - Dart
  - Dartz
  - Functional Programming
  - Applicative
  - Currying
published: true
---

## Dartz applicatives curried addition (`.ap`)

Understanding functional programming in Dart can be both fun and rewarding, especially with powerful libraries like [`dartz`](https://pub.dev/packages/dartz). In this post, we’ll walk through a concise and practical example that shows how to combine **currying** and **applicative functors** using the `.ap` method from the Dartz package.`

### What Are Applicatives and Currying?

Before diving into the code, let’s clarify the two key concepts used in this example:

- **Currying** is the technique of transforming a function with multiple arguments into a sequence of functions each taking a single argument. This allows for more flexible function composition and application.
- **Applicative Functors** (in the context of Dartz) let you apply a function wrapped in a context (`Option`, `Future`, etc.) to another value in the same context. The `.ap` method is central to this idea.

When combined, these concepts enable elegant and clean function application within contexts like `Option`, which is Dartz's version of nullable-safe handling.

### The Code Example

Let’s take a look at the complete example:

```dart showLineNumbers {2-4} title="Example"
void main() {
  final curried = (String x) => (double y) => (int z) {
    return x + y.toString() + z.toString();
  };

  final a = some('x').map(curried);
  final b = some(5.0).ap(a);
  final c = some(-5).ap(b);

  print(c);
}
```

Let’s break it down step by step.

#### Step 1: Define a Curried Function

```dart showLineNumbers title="Definition"
final curried = (String x) => (double y) => (int z) {
  return x + y.toString() + z.toString();
};
```

This is a **curried function** that takes three parameters (`String`, `double`, and `int`) one at a time. Instead of defining a function with `(String x, double y, int z)`, we return a function at each stage.

#### Step 2: Wrap the Function in an Option and Start Applying

```dart showLineNumbers title="Wrap & apply x"
final a = some('x').map(curried);
```

Here, we wrap a string `'x'` in `some` (Dartz's version of `Option`) and `map` it to the curried function. The result is an `Option` that holds a function waiting for the next argument (`double`).

```dart showLineNumbers title="Wrap & apply 5.0"
final b = some(5.0).ap(a);
```

Next, we apply the second argument (`5.0`) using `.ap`. Now, we have an `Option` holding a function that still expects one more argument: an `int`.

```dart showLineNumbers title="Wrap & apply -5"
final c = some(-5).ap(b);
```

Lastly, we apply the final argument (`-5`) using `.ap` again. The function is now fully applied.

### Result

```text showLineNumbers title="Print"
Some(x5.0-5)
```

The final result is wrapped in a `Some`, showing the concatenated values of each argument after the curried function was fully applied.

### Why Use This?

This style is powerful when working with optional values or computations that might fail. Instead of unwrapping and checking for nulls or errors at every step, you can just apply values in a clean, functional way using `.map` and `.ap`.

This approach shines especially in reactive or asynchronous codebases, and helps in composing complex functions without breaking the chain of transformations.

### Final Thoughts

Functional programming might feel a bit foreign at first in Dart, but with libraries like Dartz, you can bring in powerful concepts like currying and applicative functors with minimal overhead. The result is often more composable, predictable, and readable code—especially as your app scales.

Explore further with more combinators from Dartz, and consider applying this pattern to real-world use cases like form validation, async processing, and more.
