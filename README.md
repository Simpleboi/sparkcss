# SparkCSS

SparkCSS is a CSS preprocessor that combines SCSS-like features with utility classes similar to Tailwind. SparkCSS is designed to be a versatile and powerful tool for web developers who want to take advantage of utility-first CSS while maintaining flexibility through advanced features like directives, variables, and custom reusable snippets.

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Core Features](#core-features)
   - [Variables](#variables)
   - [Snippets](#snippets)
   - [Responsive Design](#responsive-design)
   - [Utility Classes](#utility-classes)
4. [Using SparkCSS in Your Project](#using-sparkcss-in-your-project)
5. [CLI Integration](#cli-integration)
6. [Future Updates and Extensibility](#future-updates-and-extensibility)
7. [Conclusion](#conclusion)

## Introduction
SparkCSS aims to provide the best of both worlds: the simplicity and utility of Tailwind's utility classes combined with the advanced capabilities of SCSS, such as reusable components and custom directives. The idea is to make writing CSS both efficient and easy while still allowing for a great level of customization.

## Installation
To install SparkCSS, you can use npm:

```bash
npm install -g sparkcss
```

This will install SparkCSS globally so that you can use it directly from the command line.

Or you can install it in your Local project using npm:

```bash
npm install sparkcss
```
This will make SparkCSS local to your project


## Core Features

### Variables
Variables in SparkCSS are declared using the `$` symbol, similar to SCSS. They can store reusable values, like colors or spacing units, which can be used throughout your CSS.

```scss
$primary-color: #3498db;

.my-class {
  color: $primary-color;
}
```

### Snippets
Snippets in SparkCSS work like SCSS mixins but are defined using `@snippet` and applied using `@apply`. This allows you to create reusable chunks of code with optional arguments.

```scss
@snippet button-style($bg-color) {
  background-color: $bg-color;
  padding: 10px;
  border-radius: 5px;
}

.button {
  @apply button-style(#ff6347);
}
```

### Responsive Design
With SparkCSS, you can create responsive styles using the `@responsive` directive. This allows for easy, consistent application of responsive rules.

```scss
@responsive {
  .my-container {
    width: 100%;
    @breakpoint(sm) {
      width: 50%;
    }
  }
}
```

### Utility Classes
SparkCSS provides utility classes that are very flexible. Utility classes can be generated using simple keywords to speed up your development workflow.

```html
<div class="p-4 bg-primary text-white">
  This is a utility class example
</div>
```


## Using SparkCSS in Your Project

1. **Compile SparkCSS to CSS**: Use the command line to convert your SparkCSS code into standard CSS. To do this, use the **sparkup** command:

  ```bash
  sparkup <input.spark> <output.css>
  ```

if you don't specify an output file and path for css, Spark will create one for you using the same name as the input.spark file and the output file will be in the same directory as the input: 

   ```bash
   sparkup <input.spark>
   ```

This will do the same thing as above. 


2. **Include Compiled CSS in HTML**: Add the generated CSS to your HTML file:

   ```html
   <link rel="stylesheet" href="/path/to/output.css">
   ```

## CLI Integration
The **CLI** allows you to interact with SparkCSS directly from the command line.

- **Compile Command**:
  ```bash
  sparkup <input-file> <output-file>
  ```
- **Watch Command** (for development purposes):
  ```bash
  sparkup watch <input-directory> <output-directory>
  ```

- **Check Version**
```bash
  sparkup --version
  sparkup -v
  ```

These commands help automate the conversion of `.sparkcss` files into `.css` files for easy integration.


## Future Updates and Extensibility
SparkCSS is designed to be extensible. Some potential future improvements include:
- **Dynamic Plugin System**: Allow developers to create plugins that extend the functionality of SparkCSS.
- **Code Linting and Formatting**: Add features to lint and format SparkCSS code before compiling.


## Conclusion
SparkCSS brings together the utility-first nature of Tailwind with the reusable power of SCSS, making it a flexible tool for web developers. It simplifies CSS writing while still offering advanced features, allowing for both consistency and creativity in web development. Whether you're creating utility classes or writing custom styles, SparkCSS has you covered.

As of right now, the following features aren't available yet and are in active development:

- Directives
- Utility Classes
- Snippets
- Responsive Design

Feel free to explore the open-source repository, contribute, or suggest features! 
- N8
