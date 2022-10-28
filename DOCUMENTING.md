# Documenting
When documenting classes or methods or other stuff, you need to follow certain rules for Compodoc to recognize your comments. 
This is very important as Compodocs will later generate the documentation from your comments.

## General information
Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments :

```javascript
/**
 * Supported comment
 */
```
These ones are not supported :

```javascript

/*
 * unsupported comment
 */

/*
  unsupported comment
 */


// unsupported comment
```
New lines are created inside a comment with a blank line between two lines.

```javascript
/**
 * First line
 *
 * Second line
 */
```
The example below will produce only one line in the outputed documentation.

```javascript
/**
 * First line
 * Second line
 */
```

## JSDoc tags
Currently Compodoc only support these JSDoc tags (due to TypeScript compiler limitations) :

- `@deprecated Deprecated description`

```javascript
/**
 * This is my class
 * @deprecated This class is deprecated
 */
class MyClass {}
```
- `@returns {Type} Description`

```javascript
/**
 * @param {string} target  The target to process
 * @returns The processed target number
 */
function processTarget(target:string):number;
```
- `@ignore, @internal`

These tags indicate that a symbol in your code should never appear in the documentation.

`@ignore` works inside a class, component or injectable, but also for the entire component.

```javascript
/**
 * @ignore
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {}
```
```javascript
/**
 * Footer component
 */
@Component({
    selector: 'the-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
    /**
     * @ignore
     */
    ignoredProperty: string;

    /**
     * @ignore
     */
    @Input() ignoredInput: string;

    /**
     * @ignore
     */
    @Output() ignoredOutput;

    /**
     * @ignore
     */
    ignoredFunction() {}
}
```
- `@param {Type} Name Description`

```javascript
/**
 * @example
 * This is a good example
 * processTarget('yo')
 *
 * @param {string} target  The target to process see {@link Todo}
 * @returns The processed target number
 */
function processTarget(target:string):number;
```
- `@link` : you can use these three syntax like JSDoc:

```javascript
//for an internal reference

{@link Todo}
[Todo]{@link Todo}
{@link Todo|TodoClass}

Anchors are supported : [Todo]{@link Todo#myproperty}

//for an external link

[Google]{@link http://www.google.com}
{@link http://www.apple.com|Apple}
{@link https://github.com GitHub}
```
- `@example` : for giving an example on directives, components and pipes decorators, use @example or markdown :

**INDENTATION WARNING** : TypeScript has an internal margin for new lines, if you want to keep a level of indentation, put a minimum of 13 space characters like in the next example.

```javascript
/**
 * Shows all events on a given day. Example usage:
 *
 * `` `
 * &lt;mwl-calendar-day-view
 *             [viewDate]="viewDate"
 *             [events]="events"&gt;
 * &lt;/mwl-calendar-day-view&gt;
 * `` `
 */

/**
 * Shows all events on a given day. Example usage:
 *
 * @example
 * <mwl-calendar-day-view
 *             [viewDate]="viewDate"
 *             [events]="events">
 * </mwl-calendar-day-view>
 */
```
