# Vegetable Filter

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: v12 (LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/7j6RuGD3q5XDoipEGv3yIA/vegetable-filter.gif)

## Functionality Requirements

- The component receives a prop `vegetables`, which is an array of strings, where each string is a vegetable name.

- The component renders the following:
  - One text input field where the user can type the filter string.
  - The list of filtered vegetables `<ul data-test-id="filtered-vegetables"></ul>`, such that each vegetable name is added as a list element `<li>{name}</li>` to this list (in the order they are given in props).

- Initially, the input is empty. Whenever the input is empty, all the vegetables must be rendered in the list.

- As soon as the `filter` string is typed in the input, display vegetables having names beginning with the `filter` string, preserving the order in which they are given in the props. 

- If the filter string has no filtered vegetables, then do not render the `<ul>` list but instead render `<div data-test-id="no-result">No Results Found</div>`. Please note that this element must be rendered only when the filtered list is empty and `<ul>` is not rendered. Therefore, this div must not be rendered initially on component mount.

- Please note that filtering should be case-insensitive.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The input must have the data-test-id attribute `app-input`.
- The `<ul>` must have the data-test-id attribute `filtered-vegetables`.
- The `No Results Found` div must have the data-test-id attribute `no-result`.

## Project Specifications

**Read Only Files**
- src/app/vegetableFilter/vegetableFilter.component.spec.ts
- src/app/app.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
