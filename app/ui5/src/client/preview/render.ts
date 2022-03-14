import global from 'global';
import dedent from 'ts-dedent';
import { simulatePageLoad, simulateDOMContentLoaded } from '@storybook/preview-web';
import { RenderContext } from '@storybook/store';
import { Ui5Framework } from './types-6-0';

import Control from 'sap/ui/core/Control';
import Controller from 'sap/ui/core/mvc/Controller';
import XMLView from 'sap/ui/core/mvc/XMLView';

const { sap, Node } = global;


function renderUi5ElementFromObject(element: Control) {
  element.placeAt("root", "only");
}

function renderUi5ElementFromXmlString(element: string) {
  sap.ui.require(["sap/ui/core/mvc/XMLView", "sap/ui/core/mvc/Controller"], async function(XMLView: XMLView, Ui5Controller: Controller) {
    const Controller = Ui5Controller.extend("storybook-ui5-controller", {});
    const fragment = await XMLView.create({
      definition: `<mvc:View xmlns:mvc="sap.ui.core.mvc">${element}</mvc:View>`,
      controller: new Controller()
    });
    fragment.placeAt("root", "only");
  });
}

export function renderToDOM(
  { storyFn, kind, name, showMain, showError }: RenderContext<Ui5Framework>,
  domElement: HTMLElement
) {
  const element: string | Control = storyFn();
  showMain();
  if (typeof element === 'string') {
    renderUi5ElementFromXmlString(element);
    simulatePageLoad(domElement);
  } else if (typeof element === "object" && element.placeAt) {
    domElement.innerHTML = '';
    renderUi5ElementFromObject(element);
    simulateDOMContentLoaded();
  } else {
    showError({
      title: `Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}".`,
      description: dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
        A storyfunction should either return an XML fragment (string) or an UI5 element/control (object)'
      `,
    });
  }
}
