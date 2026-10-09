# JAVA PROGRAMMING — EXAM PREPARATION NOTES

# OOP Principles & Interfaces

---

## Question 1: Explain the Four Pillars of Object-Oriented Programming (OOP) in Java with code illustrations.

### Answer

Java is an object-oriented language anchored on four primary architectural pillars:

#### 1. Encapsulation
- **Concept**: Wrapping data (fields) and the code acting on the data (methods) together into a single unit (class), while restricting direct access to private members (Data Hiding).
- **Mechanism**: Declare class variables `private` and provide public `getter` and `setter` methods with validation.

```java
public class BankAccount {
    private double balance; // Protected variable

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
```

#### 2. Inheritance
- **Concept**: The mechanism by which one class acquires the properties and methods of another class using the `extends` keyword, facilitating code reusability.
- **Types supported in Java classes**: Single, Multilevel, and Hierarchical. Multiple inheritance of classes is prohibited to prevent the *Diamond Problem* (achieved via interfaces instead).

```java
// Superclass
class Vehicle {
    protected int speed = 60;
    void drive() {
        System.out.println("Vehicle moving at " + speed + " km/h");
    }
}

// Subclass
class Car extends Vehicle {
    int airbags = 4;
}
```

#### 3. Polymorphism
- **Concept**: The ability of an object or method to take many forms.
- **Two Varieties**:
  1. **Compile-time Polymorphism (Method Overloading)**: Same method name with different parameter signatures within the same class.
  2. **Runtime Polymorphism (Method Overriding)**: Subclass provides a specific implementation of a method already defined in its superclass using the `@Override` annotation. Dynamic Method Dispatch decides the method at runtime based on the actual object.

```java
class Shape {
    void draw() { System.out.println("Drawing generic shape"); }
}
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing Circle with radius r"); }
}
```

#### 4. Abstraction
- **Concept**: Hiding internal implementation complexities and revealing only essential interfaces to users.
- **Implemented via**:
  - `abstract class` (0% to 100% abstraction; can hold instance variables, constructors, and concrete methods).
  - `interface` (100% contract specification, supports default and static methods in Java 8+).

---

## Question 2: Compare Abstract Classes and Interfaces in Java. When should each be used?

### Answer

| Feature | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Keyword** | `abstract class` | `interface` |
| **Inheritance keyword** | `extends` (Single inheritance only) | `implements` (A class can implement multiple interfaces) |
| **Methods** | Can have abstract, concrete, final, and static methods. | Abstract methods by default; default and static methods (Java 8+), private methods (Java 9+). |
| **Variables** | Can have instance variables, static, final, or non-final variables. | Variables are implicitly `public static final` constants. |
| **Constructor** | Has constructors invoked during subclass instantiation. | Cannot have constructors. |
| **Speed** | Slightly faster than interfaces (direct class lookup). | Slight search overhead for interface method tables. |
| **Design Intent** | Models an **"is-a"** relationship with shared state and behavior. | Models a **"can-do"** behavioral contract between unrelated classes. |

---

# Exception Handling & Multithreading

---

## Question 3: Explain the Java Exception Hierarchy, checked vs unchecked exceptions, and try-catch-finally mechanics.

### Answer

#### 1. Java Exception Hierarchy
```text
                  Throwable
                 /         \
            Exception       Error (OutOfMemoryError, StackOverflowError)
           /         \
Checked Exceptions    RuntimeException (Unchecked)
(IOException,         (NullPointerException,
 SQLException,         ArithmeticException,
 ClassNotFound)        ArrayIndexOutOfBounds)
```

- **Checked Exceptions**: Checked at compile-time by the compiler. The developer MUST handle them with `try-catch` or declare them using `throws`.
- **Unchecked Exceptions (Runtime Exceptions)**: Represent logical programming flaws. Not enforced at compile time.
- **Errors**: Irrecoverable JVM-level system failures. Programs should not attempt to catch them.

#### 2. The `try-with-resources` & `finally` Block
The `finally` block **always executes**, regardless of whether an exception was thrown or caught, making it ideal for resource cleanup.

```java
import java.io.*;

public class ExceptionDemo {
    public static void readFile(String path) {
        // Try-with-resources automatically closes resources implementing AutoCloseable
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line = br.readLine();
            System.out.println(line);
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("I/O error occurred: " + e.getMessage());
        }
    }
}
```

---

## Question 4: Explain Java Multithreading. Contrast extending Thread vs implementing Runnable, and explain thread synchronization.

### Answer

#### 1. Creating Threads: `Thread` Class vs `Runnable` Interface

```java
// Method 1: Implementing Runnable (RECOMMENDED: allows extending another class)
class TaskRunner implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread executing: " + Thread.currentThread().getName());
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(new TaskRunner(), "Worker-1");
        t1.start(); // Spawns new OS-level thread and invokes run()
    }
}
```

#### 2. Thread Synchronization & Race Conditions
When multiple threads read and write shared mutable state concurrently without coordination, data inconsistency occurs (Race Condition).
- **The `synchronized` Keyword**: Ensures that only one thread can execute a critical section on a given object monitor lock at any moment.

```java
class BankCounter {
    private int tickets = 10;

    // Synchronized method locks on 'this' instance
    public synchronized void bookTicket(String customer) {
        if (tickets > 0) {
            System.out.println(customer + " booked ticket #" + tickets);
            tickets--;
        } else {
            System.out.println("Housefull for " + customer);
        }
    }
}
```
