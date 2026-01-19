import { Node, mergeAttributes } from '@tiptap/core';

export type CalloutType = 'info' | 'tip' | 'warning' | 'important';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (type: CalloutType) => ReturnType;
      toggleCallout: (type: CalloutType) => ReturnType;
      unsetCallout: () => ReturnType;
    };
  }
}

export const CalloutExtension = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-callout') || 'info',
        renderHTML: attributes => ({
          'data-callout': attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-callout]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        class: `callout callout-${HTMLAttributes['data-callout'] || 'info'}`,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCallout:
        (type: CalloutType) =>
        ({ commands }) => {
          return commands.wrapIn(this.name, { type });
        },
      toggleCallout:
        (type: CalloutType) =>
        ({ commands, state }) => {
          const { from, to } = state.selection;
          let isActive = false;
          
          state.doc.nodesBetween(from, to, (node) => {
            if (node.type.name === this.name && node.attrs.type === type) {
              isActive = true;
            }
          });

          if (isActive) {
            return commands.lift(this.name);
          }
          
          return commands.wrapIn(this.name, { type });
        },
      unsetCallout:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },
});
