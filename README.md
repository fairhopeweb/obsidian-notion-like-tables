# Obsidian Notion-Like Tables

[![Active Development](https://img.shields.io/badge/Maintenance%20Level-Actively%20Developed-brightgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d)

Obsidian Notion-Like Tables allows you to create markdown tables using an interface similar to that found in Notion.so.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/preview.png)

## What's New?

### Version 3.5.0

I am proud to announce that NLT now supports live preview! Please check it out! :)

The settings cache format was updated to accomdomate this functionality. You won't need to do anything for your tables to render, as the app will automatically update your data.json file.

### Version 3.4.0

-   The pound sign `#` in tags are now optional. See `Tags` below for more details.
-   NLT now supports bold, italics, highlight and underline. See `Markdown` below for more details.

### Version 3.3.0

-   Line break elements are now supported for cells in a column with the type `text` selected. See `Line Breaks` below for usage information

### Migrating from 2.3.6

Starting in 3.0.0, Notion-Like tables supports a new table format that will facilitate better development in the plugin.

Please upgrade your tables to this new format. This update also includes several bug fixes that could only be fixed by placing column and row ids into the table.

**To migrate to the new format please see the section below: `Making a Table Manually`**

## Usage

### Hotkeys

-   Add a new NLT markdown table
    -   `ctrl + shift + +` (Windows) (Press + once)
    -   `cmd + shift + +` (Mac)
-   Add a new column to a focused table
    -   `ctrl + shift + \` (Windows)
    -   `cmd + shift + \ ` (Mac)
-   Add a new row to a focused table
    -   `ctrl + shift + enter` (Windows)
    -   `cmd + shift + enter` (Mac)

### Making a Table via Command

To quickly make a table you can use the add table command. Press `cmd + p` on your keyboard search "Add table".

Note: you must be in editing mode for this command to appear.

Toggle to reading mode and the table will automatically render.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/add-table-command.png)

### Making a Table Manually

A Notion-Like Table uses normal Obsidian table markdown syntax with 2 additional rows and 1 column for meta-data:

-   A type defintion row
-   A column id row
-   A row id column

#### Type Definition Row

The type definition row is a normal markdown row with each cell containing the type of data you want that column to accept. The plugin currently supports 5 column types: `text`, `number`, `tag`, `date` and `checkbox`. The last cell of the row must only contain whitespace for a Notion-Like Table to render.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/type-def-row.png)

#### Column Id Row

The column id row is a normal markdown row with each cell containing a unique column id. A column id starts with `column-id-` followed by alpha-numeric characters or hyphens. This id must be unique to each table, but may be reused in other tables.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/column-id-row.png)

#### Row Id Column

The row id column is the last column of the table and contains both a table id and the unique ids for each row. Note that the cell that resides in the header must only contain whitespace for a Notion-Like table to render.

##### Table Id

A table id starts with `table-id-` followed by alpha-numeric characters or hyphens. This id must be unique to each note, but may be reused in other notes.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/table-id.png)

##### Row Ids

A row id starts with `row-id-` followed by alpha-numeric characters or hyphens. This id must be unique to each table, but may be reused in other tables.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/row-ids.png)

### Renaming IDs

#### Renaming table ids

Renaming a table id will cause your table to become orphaned from its saved data in the cache and create new data from the markdown. This can cause you to lose the saved column width, sorting, or tag colors on your table. If you would like to rename your table-id to something meaningful, I recommend doing this at the creation of your table.

#### Renaming column ids

Renaming column ids is less severe than renaming a table id, as you will only lose orphan that column from its saved state. Once again, I recommend renaming this at the creation of your table before you have started to adjust the settings.

### Headers

Click on a header name to view the header menu. In the header menu you can rename the header, sort your column values or change the header type.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/header.png)

### Editing Cells

To edit a cell, just click on it. An input, textarea or menu will appear which will allow you to edit the cell's content. Make the necessary changes and then click outside the box or press enter to save the text. Notion-Like tables will automatically handle updating your markdown.

### Text Cells

Text can be rendered in cells that are in a column with the `text` type selected.

#### Markdown

To bold text use either double astericks `**` or the bold tag `<b>`

-   `**This is bold**`
-   `<b>This is bold</b>`

To italicize text use either single astericks `*` or the italics tag `<i>`

-   `*This is italicized*`
-   `<i>This is italicized</i>`

To highlight text use the double equal sign syntax `==`

-   `==This is highlighted==`

To underline text use the underline tag `<u>`

-   `<u>This is underlined</u>`

#### Links

Links can be rendered in cells that are in a column with the `text` column type is selected. To render a link, add double squares surrounding text `[[My Link]]`.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/internal-link-edit.png)

#### URLs

If you want to display a url, type the url making sure it begins with `http://` or `https://`. NLT will automatically render it in the table.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/url.png)

#### Line Breaks

Line breaks can be added using the break line HTML tag `<br>`. For example, if you would like to create a line between two pieces of text, you could add:

`This is my text<br><br>There is now a line between us`

### Tags

Tags can be rendered in cells that are in a column with the `tag` type selected.

Tags have a special notion-like menu that will appear. Tags are scoped to each column of a table. You can type text to filter existing tags and select one. You can also create a new tag by typing text and clicking "Create New" or pressing enter.

Tags can be rendered with or without a pound sign `#`. If you use a pound sign, then the tag will be rendered as a internal Obsidian tag link. Otherwise, it will be rendered as plain text.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/tag-menu.png)

#### Tag Colors

Once a tag has been added to a cell, you click on any cell that has that tag and then click on the horizontal menu button to the side of the tag name. A menu will then pop up through which you can change the tag color.

### Dates

Dates can be rendered in cells that are in a column with the `date` type selected. To render a date please follow the format `yyyy/mm/dd` in your markdown.

### Checkboxes

Checkboxes can be rendered in cells that are in a column with the `checkbox` type selected. To render a checkbox, add two square brackets with a space `[ ]` for unchecked or two square brackets surrounding an x `[x]` for checked.

### Copy Cell Content

Right click a cell and its content will be added to your clipboard.

NOTE: The table must be in focus for this to work. Click on the table to focus it.

### Undoing a Type Change

NLTs does not currently have built in history. If you need to undo changes, go to editing mode and undo markdown changes using `ctrl+z` (or `option-z`on mac). Then go back to reading mode.

### Errors

#### NLT Tables Not Rendering

If your table is missing a table id row or type definition row then it will not be rendered as a Notion-Like Table. Likewise, if you use an invalid column type other than the accepted column types. A Notion-Like Table will not be rendered.

Please check your console for more information regarding your errors:
You can view the console using `cmd + alt + i` (Windows) or `cmd + option + i` (Mac)

#### Cell Type Errors

A cell type error will occur if you enter data which doesn't match the column data type. Please correct this error in your markdown to continue.

![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/cell-error-1.png)
![Screenshot](https://raw.githubusercontent.com/trey-wallis/obsidian-notion-like-tables/master/.readme/cell-error-2.png)

## Custom Themes

NLT tables uses normal table semantic elements (`table`, `th`, `tr`, `td`, etc) to render. If you wish to edit the display of the table, just style those elements in your CSS.

## Bugs and Feature Requests

If you find a bug or would like to suggest a feature, please open an issue [here](https://github.com/trey-wallis/obsidian-notion-like-tables/issues). I will try to respond as soon as possible.

## Support Plugin Development

-   I have a lot of features that I am excited to add to this plugin. If you would like to help support plugin development, you can [buy me an herbal tea](https://www.buymeacoffee.com/treywallis) ;)

## License

-   GNU GPLv3

## Author

-   Trey Wallis
