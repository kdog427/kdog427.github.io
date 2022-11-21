## CSS frameworks

<sup>(specifically, [purecss.io](http://purecss.io))</sup>

So yesterday, when I was talking about grid systems and CSS frameworks, I sent you [this example](https://jsbin.com/gariwihuhu/edit?html,output), which I think was probably misleading.

##### Why do I want one?

When you start a website from scratch, you're very often adding in the same types of things over and over:  nicer form inputs, button styles, rules that cancel out the default spacing that browsers will apply to a blank page, etc.  Most sites need a way of managing content as the screen shrinks or expands, so a grid system is usually one of these things that you end up needing.

CSS frameworks help you get up and running more quickly: they provide you with helpful default styling for common elements (for [buttons](http://purecss.io/buttons/) and [forms](http://purecss.io/forms/) and [grids](http://purecss.io/grids/), for example), but without being too prescriptive.  That is, they are built so that you can override things easily.  The PureCSS framework has an example of [overriding their default button styles](http://purecss.io/buttons/#customizing-buttons) to give them lots of different colours.

##### How do you use one?

Using a CSS framework just means importing it as a set of styles and then adding classes to things.

Yesterday, I showed you an example of how adding styles to columns was a way to get them to be different widths, but that's not how you're supposed to use them.  I just added the widths because it was JSBin and I was trying to keep it as simple as possible.

In this case, the framework gives you styles you can use for grids automatically (once you've included the right file): you shouldn't be writing your own column widths.

##### How do you include one in an HTML page?

Either you can download it and commit it and include it locally, or most css/js frameworks give you some option where you can just download a version they've cached somewhere.  Additionally, since CSS frameworks tend to get pretty large, lots of them let you pick and choose the things that you need so that you don't have to download the whole shebang everytime.  [PureCSS does this](http://purecss.io/customize/), and [Foundation does it to an extreme](http://foundation.zurb.com/sites/download.html/).

For example, this is how you would customise the pure css download

```html

  <!-- i want buttons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/g/pure@0.6.2(base-min.css+buttons-min.css)">

  <!-- i want grids + responsive grids -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/g/pure@0.6.2(base-min.css+grids-min.css+grids-responsive-min.css)">

  <!-- i want grids + responsive grids + buttons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/g/pure@0.6.2(base-min.css+grids-min.css+grids-responsive-min.css+buttons-min.css)">

```

##### Why did you pick PureCSS?

I picked PureCSS because it claims to be minimal while also being actively maintained and easy to use and csutomise.
There are tons of other ones.

- [Bootstrap](http://getbootstrap.com/css/) is probably the most well-known.  It's fine.  It works
- [Foundation](http://foundation.zurb.com/sites/getting-started.html) looks super chunky to me.
- [Skeleton](http://getskeleton.com/) seemed the most minimal, but the guy doesn't look like he's maintaining it anymore.
- [Bulma](https://www.reddit.com/r/web_design/comments/44epa4/bulma_a_modern_css_framework_based_on_flexbox/) got lots of points on reddit a while ago and somehow has really good SEO.
- [etc](https://www.google.co.uk/?#q=best+css+framework)

It's fine if you want to use a different one, but they're all pretty similar in what you can do with them.


<br />

### Show me some real examples

No problem.  I've done up a few examples where I've written a couple of simple elements and a tiny bit of custom CSS.  My custom CSS doesn't have anything to do with making the grids work or making the buttons look different: that's all coming for free from the Pure CSS framework by adding the right classnames.

In each example, the CSS and HTML is pretty much always the same.  The only thing that changes is what we're importing at the top of each file.


| Examples                                       | Grids              | Responsive grids   | Buttons            |
| ---------------------------------------------- |:------------------:|:------------------:|:------------------:|
| [Example 1](http://kevinmmcraig.ca/examples/1) | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Example 2](http://kevinmmcraig.ca/examples/2) | :white_check_mark: | :x:                | :white_check_mark: |
| [Example 3](http://kevinmmcraig.ca/examples/3) | :white_check_mark: | :white_check_mark: | :x:                |
| [Example 4](http://kevinmmcraig.ca/examples/4) | :x:                | :x:                | :white_check_mark: |
| [Example 5](http://kevinmmcraig.ca/examples/5) | :x:                | :x:                | :x:                |

That's it.  Hope there was something useful in there.
