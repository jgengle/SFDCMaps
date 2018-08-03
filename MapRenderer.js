({
    rerender: function (component, helper) {
        console.log("render");
        var nodes = this.superRerender();
        if (!window.L) return nodes;
        helper.displayMap(component);
        return nodes;
    }
})
