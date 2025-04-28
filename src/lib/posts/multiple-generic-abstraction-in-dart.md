---
title: 'Multiple Generic Abstraction in Dart'
description: 'Learn how to use generics and abstract classes in Dart to build flexible and reusable calculation logic.'
date: '2025-04-19'
categories:
  - Dart
  - Generic
  - Type
  - OOP
published: true
---

## Generic Abstraction Patterns for Scalable Dart Code

When working on larger applications, especially those that involve business logic and calculations, code reusability and maintainability become essential. Dart's type system, with its support for generics and object-oriented programming (OOP), allows us to build flexible and type-safe abstractions.

In this blog post, we'll explore a technique called **multiple generic abstraction**. This design pattern helps developers define reusable calculation structures using generics and abstract classes. We'll break down a basic example that demonstrates this concept, understand how it works, and when to use it.

### Why Use Generic Abstractions?

Generics in Dart allow you to write code that works with different data types while retaining type safety. When combined with abstract classes, generics become a powerful tool for creating APIs or modules that are extensible, testable, and adaptable.

In our case, we aim to define a flexible **executor** pattern for performing calculations. The executor should be able to:

- Work with different types of inputs (`Param` objects)
- Produce different types of outputs (like `int`, `double`, etc.)
- Enforce consistent contracts using abstract classes

### The Abstraction Declaration

Let’s start by looking at the core structure of our abstraction:

```dart showLineNumbers {3,8} title="abstraction"
import 'dart:async';

abstract class A<U extends Param, T> {
  A();
  FutureOr<T> calculate(U a);
}

abstract class B<int> extends A<ParamImpl, int> {
  B();
  @override
  int calculate(ParamImpl b);
}

abstract class Param {}
```

#### Explanation

- `abstract class A<U extends Param, T>`: This is our **base generic abstract class**. It defines a method `calculate` that takes a parameter of type `U` (which must extend `Param`) and returns a result of type `T`. The return type is `FutureOr<T>`, allowing for both synchronous and asynchronous implementations.
- `abstract class B<int> extends A<ParamImpl, int>`: This is a more **concrete abstract class**, which extends `A` by fixing the types: it always takes a `ParamImpl` and returns an `int`. This lets us define variations of calculations while narrowing down the types.
- `abstract class Param {}`: This is a base class for any input type we want to pass to `A`. It allows us to define multiple types of parameter implementations while keeping the API consistent.

### The Concrete Implementation

Now let’s look at how we would implement these abstract classes:

```dart showLineNumbers {1,3} title="implementation"
class ParamImpl extends Param {}

class BImpl implements B {
  @override
  int calculate(ParamImpl b) {
    return 0;
  }
}
```

#### Explanation

- `ParamImpl`: A concrete implementation of the `Param` class. This would typically include fields and methods relevant to the calculation logic.
- `BImpl`: This class implements `B`, which already extends `A`. By doing so, `BImpl` inherits the contract to calculate something using a `ParamImpl` and return an `int`. In this example, it simply returns `0`, but in a real scenario, you’d include the actual computation here.

### Benefits of This Pattern

- **Code Reusability**: You can define new types of calculations by simply implementing or extending the base classes.
- **Type Safety**: Dart's generics ensure that the types passed around are valid, reducing runtime errors.
- **Flexibility**: You can define new parameter classes and result types without changing the base logic.
- **Separation of Concerns**: Logic for input structure (`Param`) is decoupled from the calculation logic.

### Use Cases

This pattern is particularly useful in scenarios like:

- Data transformation layers
- Business rule engines
- Mathematical or financial calculators
- Workflow processors that vary by type of input and output

### Final Thoughts

Multiple generic abstraction is a clean and scalable approach to managing complex logic in Dart. It leverages the power of generics and OOP to ensure code is modular, maintainable, and extensible. If you're building a system where operations vary based on input and output types, consider adopting this design.
