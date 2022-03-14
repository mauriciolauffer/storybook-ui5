export default {
  title: 'ReverseButton',
  argTypes: {
    text: {
      control: 'text'
    }
  }
};

const TemplateXmlString = (args) => `<ReverseButton xmlns="custom" text="${args.text}" />`;
export const XmlString = TemplateXmlString.bind({});
XmlString.args = {
  text: "Wait, this is weird!"
}

const RevButton = sap.ui.requireSync('custom/ReverseButton'); // Load control sync
const TemplateObject = (args) => new RevButton({text: args.text});
export const UI5Object = TemplateObject.bind({});
UI5Object.args = {
  text: "from ui5 object"
};

const TemplateEvent = (args) => new RevButton({
  text: args.text,
  press: (evt) => {
    evt.getSource().setText(`ts: ${ Date.now() }`);
  }
});
export const UI5ObjectWithEvent = TemplateEvent.bind({});
UI5ObjectWithEvent.args = {
  text: "press event"
};


