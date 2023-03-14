import { EventListenerType } from "../type";

export const executeEventListener = (
  target: Element,
  params: EventListenerType
) => {
  target?.addEventListener(params.type, (event) => {
    event.preventDefault();

    params.listener(event);
  });
};
