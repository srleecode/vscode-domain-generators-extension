import { TaskExecutionSchema } from "../nx-console/task-execution-schema";
import { TaskExecutionOutputMessageType } from "./task-execution-output-message-type";

export interface TaskExecutionMessage {
  command: string;
  positional: string;
  flags: string[];
}

export type TaskExecutionOutputMessage =
  | TaskExecutionFormInitOutputMessage
  | TaskExecutionRunCommandOutputMessage;

export class TaskExecutionRunCommandOutputMessage {
  readonly type = TaskExecutionOutputMessageType.RunCommand;

  constructor(public readonly payload: TaskExecutionMessage) {}
}

export class TaskExecutionFormInitOutputMessage {
  readonly type = TaskExecutionOutputMessageType.TaskExecutionFormInit;

  readonly payload = null;
}
export interface GlobalConfigurationData {
  enableTaskExecutionDryRunOnChange: boolean;
}

// Task execution input messages
export type TaskExecutionInputMessage =
  | TaskExecutionSchemaInputMessage
  | TaskExecutionGlobalConfigurationInputMessage;

export enum TaskExecutionInputMessageType {
  SetTaskExecutionSchema = "generator",
  SetGlobalConfiguration = "config",
  SetStyles = "style",
}

export class TaskExecutionSchemaInputMessage {
  readonly type = TaskExecutionInputMessageType.SetTaskExecutionSchema;

  constructor(public readonly payload: TaskExecutionSchema) {}
}

export class TaskExecutionGlobalConfigurationInputMessage {
  readonly type = TaskExecutionInputMessageType.SetGlobalConfiguration;

  constructor(public readonly payload: GlobalConfigurationData) {}
}
