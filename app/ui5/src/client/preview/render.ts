import global from 'global';
import dedent from 'ts-dedent';
import { simulatePageLoad, simulateDOMContentLoaded } from '@storybook/preview-web';
import { RenderContext } from '@storybook/store';
import { Ui5Framework } from './types-6-0';

import Control from 'sap/ui/core/Control';
import XMLView from 'sap/ui/core/mvc/XMLView';

const { sap, Node } = global;

function renderUi5ElementFromObject(element: Control) {
  element.placeAt("root", "only");
}

function renderUi5ElementFromXmlString(element: string) {
  sap.ui.require(["sap/ui/core/mvc/XMLView"], async function(XMLViewObj: XMLView) {
    const view = await XMLViewObj.create({
      definition: `<mvc:View xmlns:mvc="sap.ui.core.mvc">${element}</mvc:View>`
    });
    view.placeAt("root", "only");
  });
}

export function renderToDOM(
  { storyFn, kind, name, showMain, showError, forceRemount }: RenderContext<Ui5Framework>,
  domElement: HTMLElement
) {
  const element: string | Control | Node = storyFn();
  showMain();
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
  if (typeof element === 'string') {
    renderUi5ElementFromXmlString(element);
    simulatePageLoad(domElement);
  } else if (element instanceof Node) {
    // Don't re-mount the element if it didn't change and neither did the story
    if (domElement.firstChild === element && forceRemount === false) {
      return;
    }
    domElement.appendChild(element);
    simulateDOMContentLoaded();
  } else if (typeof element === "object" && element.placeAt) {
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
