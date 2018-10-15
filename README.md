# @mhy/config
This lib is a collection of all configuration and UI panels (ecosystem)
 `@mhy` uses.

# Config
Load configuration based on the current environment from folders
(see repo) and/or from a project's `package.json` file.
The final object structure is being represented in the
directory/package.json structure. (see repo)

Config options are being separated into environments. By default `@mhy`
uses **root** (always used), **development** and **production**.

# Examples
```
// Dir structure
foo
  index.js
  development
      bar.js => exports 1
  production
      baz.js => exports 2
  root
      fip.js => exports 3
```

API
```
import { load } from '@mhy/config'

load('foo')
```

CLI
```
mhy config foo
```

Output
```
{
    bar: 1,
    fip: 3
}
*/
```

> `baz` is missing because `development` env is default thus it's not
being loaded.

Defining env
```
// *nix
NODE_ENV=production mhy config foo

// Windows
set NODE_ENV=production&& mhy config foo // not a typo, no space needed there!
```

## CLI
It'll return the configuration object being used from `@mhy/config`.

```
// Print out config
mhy config webpack

// Print out config in different format
mhy config babel -f json
mhy config babel --format=json

// Print out config in different format and save into a file
mhy config babel -f json >> .babelrc
```

## Custom overrides

### `using files/folders`
Structure
```
webpack
  development
     devServer.js
```

devServer.js file
```
module.exports = (defaults) => ({
    ...defaults,
    host: 'my-host.com'
})
```

### Using `package.json`
package.json file
```
{
    ...
    "mhy" {
       "webpack": {
           "development": {
               "devServer": {
                   "host": "my-host.com"
               }
           }
       }
    }
    ...
}
```

# UI
UIs are basically built-in ecosystem tasks. You can run all of them
at once or separately.
```
// Run ecosystem (ui) (default)
mhy
mhy ui

// Run specific ui process only
mhy webpack-dev-server
mhy run webpack-dev-server

// Run specific process only with specific task
mhy jest watch
mhy run jest watch
```

## Navigation with-in UI
- `Tab` change active panel
- `Left/Right arrow` select action
- `Enter` run selected action
- `Up/Down arrow` scroll up/down in the selected panel