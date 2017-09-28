const MENU_ID = "menu";
const MENU_ENTRY_ELEMENT = "LI";

function MenuEntry(collapsed, element) {
    this.collapsed = collapsed;
    this.element = element;
    this.registerEventHandlers();
}
MenuEntry.prototype.parse = function (parentElement, parentMenuEntry) {
    if (!parentElement.children) {
        return;
    }

    for (index in parentElement.children) {
        var current = parentElement.children[index];

        if (current.tagName === MENU_ENTRY_ELEMENT) {
            var subMenuEntry = new MenuEntry(true, current);
            if (!parentMenuEntry.subMenuEntries) {
                parentMenuEntry.subMenuEntries = new Array();
            }
            parentMenuEntry.subMenuEntries.push(subMenuEntry);
            parentMenuEntry.parse(current, subMenuEntry);
        } else {
            parentMenuEntry.parse(current, parentMenuEntry);
        }
    }
}
MenuEntry.prototype.registerEventHandlers = function () {
    if (this.element.tagName === MENU_ENTRY_ELEMENT) {
        this.element.onmouseover = this.toogle.bind(this);
        this.element.onmouseout = this.toogle.bind(this);
    }
}
MenuEntry.prototype.toogle = function (event) {
    this.collapsed = !this.collapsed;
    var className = (this.collapsed) ? 'closed' : 'open';

    if (this.subMenuEntries) {
        for (index in this.subMenuEntries) {
            var subMenuEntry = this.subMenuEntries[index];
            subMenuEntry.element.className = className;
        }
    }
}

function buildMenu() {
    var menu = document.getElementById(MENU_ID);
    this.menuEntry = new MenuEntry(true, menu);
    this.menuEntry.parse(menu, this.menuEntry);
}