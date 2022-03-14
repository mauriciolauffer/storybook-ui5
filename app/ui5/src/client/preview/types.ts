import Control from 'sap/ui/core/Control';

export type { RenderContext } from '@storybook/core';

export type StoryFnUi5ReturnType = string | Control;

export interface IStorybookStory {
  name: string;
  render: (context: any) => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}