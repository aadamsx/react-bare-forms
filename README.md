![ReactBareForms](images/rbf_logo3.png?raw=true "React Bare Forms")

React library to build forms & let you switch in & out Bootstrap 4 styling.

Docs are [here](https://joegasewicz.github.io/react-bare-forms/) 
## Install
```
npm install react-bare-forms
```

## Usage
A basic form example with a text input field & submit button. Also, note how imported `isFieldEmpty` function 
from `react-bare-forms`. This is a validator & can be used to validate a single or group (such as radio buttons) field(s).
There are different validators available but there is also a custom validator factor function to make is super easy tro create your own validator functions.
```typescript jsx
import {Form, isFieldEmpty, SubmitButton, TextInputField} from "react-bare-forms";

const state = { age: 0 }

<Form
    state={state}
    bare={false}
    autoComplete="off"
    callback={() => console.log("Form submitted!")}>

    <TextInputField
        value={state.age}
        name="age"
        hint="Enter your age"
        labelText="Age"
        validators={[isFieldEmpty(2)]} />
               
    <SubmitButton>Submit Form</SubmitButton>
</Form>
```
## File Ref
RBF's provides a function that returns a React ref to access your file object. To use, simply assign the returned ref from
the `createFileRef` function to a variable & pass this variable to `FileField`'s ref prop. For example:
````typescript jsx
 import {createFileRef, FileField, isFile} from "react-bare-forms";

 const myFileRef = createFileRef();
 
 <FileField
     ref={myFileRef}
     hint="Must be a file"
     labelText="Upload your file"
     name="myFileTest"
     validators={[isFile()]}
 />
 
 // Now myFileRef has access to the file object once it's been selected by the user
````
## Form Consumer
RBF's provides the `FormConsumer` for you to debug visually your form. Below is an example of a form container a single text input field.
````typescript jsx
import {Form, FormConsumer, IFormContext, isFieldEmpty, TextInputField} from "react-bare-forms";

const state = { age: 0 }

<Form>
    <TextInputField
        value={state.age}
        name="age"
        hint="Enter your age"
        labelText="Age"
        validators={[isFieldEmpty(5)]}
    />
    <FormConsumer>
        {(context: IFormContext) => {
            return <code>{JSON.stringify(context.state)}</code>;
        }}
    </FormConsumer>
</Form>

````
The `context` object return from the `FormConsumer` has a `metadata` property which gives you detailed
values of the current state of that form field element.
````json
{"inputs":{"state":{"age":{"name":"age","validation":[{"isValid":false,"messages":["Must be at least 2 characters"]}],"isTouched":false,"fieldValues":{"type":"value","currentValue":0}}},"metaType":"inputs","defaultState":{},"_name":"age","_fieldType":"text"},"checkboxes":{"state":{},"metaType":"checkboxes","defaultState":{}},"files":{"state":{},"metaType":"files","defaultState":{}},"radioGroups":{"state":{},"metaType":"radioGroups","defaultState":{}}}
````

## Validators

There are validators available to handle all the basic common form validation requirements. Below is a list
of the current validators available but this list should grow in the near future!

- [areFieldsEqual](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#arefieldsequal),
- [isChecked](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#ischecked),
- [isEmailValid](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#isemailvalid),
- [isFieldEmpty](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#isfieldempty),
- [isFile](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#isfile),
- [isRadioChecked](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#isradiochecked),

To create your own custom hooks use:

- [customValidator](https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#customvalidator)

## Form Fields
There are 4 components that cover the `input` field element:

- [TextInputField](https://joegasewicz.github.io/react-bare-forms/modules/_elements_.html#textinputfield)
- [EmailField](https://joegasewicz.github.io/react-bare-forms/modules/_elements_.html#emailfield)
- [PasswordField](https://joegasewicz.github.io/react-bare-forms/modules/_elements_.html#passwordfield)
- [CheckBoxField](https://joegasewicz.github.io/react-bare-forms/modules/_elements_.html#checkboxfield) 

#### TextInputField
```typescript jsx
import {TextInputField} from "react-bare-forms";

const state = { username: "" }
// A bare form example ... remember to set the Form.bare property to `true`
<TextInputField
    value={this.state.username}
    name="username"
/>

// Example with Bootstrap styling (Bootstrap styling comes as default)

<TextInputField
    value={state.username}
    name="username"
    hint="Needs to be at least 50 characters long"
    labelText="Username"
/>
```
#### EmailField
```typescript jsx
  import {EmailField} from "react-base-forms"

  const state = { email: "" }

 // A bare form example ... remember to set the Form.bare property to `true`
 <EmailField
    value={state.email}
    name="email"
 />

 // Example with Bootstrap styling (Bootstrap styling comes as default)
 <EmailField
    value={state.email}
    name="email"
    hint="Needs to be at least 50 characters long"
    labelText="Username"
  />
```
#### PasswordField
The `PasswordField` works the same as the `EmailField` & `TextInputField`'s.
```typescript jsx

import {areFieldsEqual, isFieldEmpty, PasswordField} from "react-base-forms";
 
const state = { password: "", confirmPassword: "" };
 
// A bare form example ... remember to set the {@link Form.bare} property to `true`
<PasswordField
  value={state.password}
  name="username"
  validators={[isFieldEmpty(8)]}
/>
 
// Example with Bootstrap styling (Bootstrap styling comes as default)

<PasswordField
  value={state.confirmPassword}
  name="password"
  hint="Needs to be at least 8 characters long"
  labelText="Password"
/>
```
Also we can create two *PasswordField* components to confirm passwords are equal. Please see
{@link areFieldsEqual} for more info.
The first *PasswordField* has has a *name* prop of **password** & the second *PasswordField* a name
prop of *confirmPassword*. Then we can add a *areFieldsEqual* validator to the *PasswordField*
with the *confirmPassword* name props *areFieldsEqual* takes the first *PasswordField*
name as an argument).

```typescript jsx
<PasswordField
    name="password"
    // other props...

/>

<PasswordField
    name="confirmPassword"
    // other props...
    validators={[areFieldsEqual("password")]}
/>
```

#### Checkbox Input _field
```typescript jsx
<CheckBoxField
    name="terms"
    checked={this.state.terms}
    hint="Click to agree"
    labelText="Agree to terms & conditions"
/>
```
### Other Field Elements
The rest of thesingle input fields.

#### TextArea Input _field
```typescript jsx
<TextAreaField
    name="about"
    value={this.state.about}
    hint="Your email"
    labelText="Must be at least 20 characters"
    validators={[isFieldEmpty(20)]}
/>


#### Radio Buttons

```typescript jsx
<RadioGroup name="group1">
    <RadioField
        name="radio1"
        checked={this.state.radio1}
        hint="Click to agree"
        labelText="Agree to terms & conditions"
    />

    <RadioField
        name="radio2"
        checked={this.state.radio2}
        hint="Click to agree"
        labelText="Agree to terms & conditions"
    />

    <RadioField
        name="radio3"
        checked={this.state.radio3}
        hint="Click to agree"
        labelText="Agree to terms & conditions"
    />
</RadioGroup>
```

#### Bootstrap 4
Bootstrap 4 doesn't come with React Bare Forms so that you can obtain the smallest bundle size possible!

There are several ways to include Bootstrap 4. the simplist (but not the best) is to import it directly from the cdn in your index.html file. For example
```html
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
``` 

But a much better way is to use Sass, so them we can choose which Bootstrap 4 Sass components we want our our React app to use.

```
    npm install bootstrap
```

Then install the loaders
```
npm install style-loader css-loader sass-loader --save-dev

# In your webpack.config.js:

    {
             test: /\.scss$/,
             use: [
                 "style-loader", // creates style nodes from JS strings
                 "css-loader", // translates CSS into CommonJS
                 "sass-loader" // compiles Sass to CSS, using Node Sass by default
             ]
    }
```
If you want to keep bundle sizes to a minimum, React Bare Forms only requires the following bootstrap 4 components:
- Forms
- Buttons
- Alerts

You can import them like this:
```scss
// - mystyles.scss
// Required
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

// Optional
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/alert";
@import "~bootstrap/scss/buttons";
```
And finally import your sass into your React application:

```jsx
import "./mystyles.scss";
```

<sup>**Fields that are not part of a RBF's form group*</sup>

Licence MIT
