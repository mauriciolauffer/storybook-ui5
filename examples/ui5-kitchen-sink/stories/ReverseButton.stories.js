// Load control sync
const RevButton = sap.ui.requireSync('custom/ReverseButton');

export default {
  title: 'ReverseButton',
  component: RevButton
};

const TemplateXmlString = (args) => `<ReverseButton xmlns="custom" text="${args.text}" />`;
export const XmlString = TemplateXmlString.bind({});
XmlString.args = {
  text: "Wait, this is weird!"
}

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

export const GenericHTMLButton = () => {
  const btn = document.createElement('button');
  btn.textContent = 'Generic HTML Button';
  return btn;
};