import { test as base, expect, Locator, Page } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { createWorkflow } from '../requests/create-workflow';
import { deleteWorkflow } from '../requests/delete-workflow';
import { destroyWorkflow } from '../requests/destroy-workflow';
import { WorkflowActionType, WorkflowTriggerType } from '../types/workflows';

export class WorkflowVisualizerPage {
  #page: Page;

  workflowId: string;
  workflowName: string;

  readonly addStepButton: Locator;
  readonly workflowStatus: Locator;
  readonly activateWorkflowButton: Locator;
  readonly deactivateWorkflowButton: Locator;
  readonly addTriggerButton: Locator;
  readonly commandMenu: Locator;
  readonly workflowNameLabel: Locator;
  readonly triggerNode: Locator;
  readonly background: Locator;
  readonly useAsDraftButton: Locator;
  readonly overrideDraftButton: Locator;
  readonly discardDraftButton: Locator;

  #actionNames: Record<WorkflowActionType, string> = {
    'create-record': 'Create Record',
    'update-record': 'Update Record',
    'delete-record': 'Delete Record',
    code: 'Code',
    'send-email': 'Send Email',
  };

  #createdActionNames: Record<WorkflowActionType, string> = {
    'create-record': 'Create Record',
    'update-record': 'Update Record',
    'delete-record': 'Delete Record',
    code: 'Code - Serverless Function',
    'send-email': 'Send Email',
  };

  #triggerNames: Record<WorkflowTriggerType, string> = {
    'record-created': 'Record is Created',
    'record-updated': 'Record is Updated',
    'record-deleted': 'Record is Deleted',
    manual: 'Launch manually',
  };

  #createdTriggerNames: Record<WorkflowTriggerType, string> = {
    'record-created': 'Record is Created',
    'record-updated': 'Record is Updated',
    'record-deleted': 'Record is Deleted',
    manual: 'Launch manually',
  };

  constructor({ page, workflowName }: { page: Page; workflowName: string }) {
    this.#page = page;
    this.workflowName = workflowName;

    this.addStepButton = page.getByLabel('Add a step');
    this.workflowStatus = page.getByTestId('workflow-visualizer-status');
    this.activateWorkflowButton = page.getByLabel('Activate Workflow', {
      exact: true,
    });
    this.deactivateWorkflowButton = page.getByLabel('Deactivate Workflow', {
      exact: true,
    });
    this.addTriggerButton = page.getByText('Add a Trigger');
    this.commandMenu = page.getByTestId('command-menu');
    this.workflowNameLabel = page
      .getByTestId('top-bar-title')
      .getByText(this.workflowName);
    this.triggerNode = this.#page.getByTestId('rf__node-trigger');
    this.background = page.locator('.react-flow__pane');
    this.useAsDraftButton = page.getByRole('button', { name: 'Use as draft' });
    this.overrideDraftButton = page.getByRole('button', {
      name: 'Override Draft',
    });
    this.discardDraftButton = page.getByRole('button', {
      name: 'Discard Draft',
    });
  }

  async createOneWorkflow() {
    const id = randomUUID();

    const response = await createWorkflow({
      page: this.#page,
      workflowId: id,
      workflowName: this.workflowName,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.data.createWorkflow.id).toBe(id);

    this.workflowId = id;
  }

  async waitForWorkflowVisualizerLoad() {
    await expect(this.workflowNameLabel).toBeVisible();
  }

  async goToWorkflowVisualizerPage() {
    await this.#page.goto(`/`);

    const workflowsLink = this.#page.getByRole('link', { name: 'Workflows' });

    await workflowsLink.click();

    const workflowLink = this.#page
      .getByTestId(`row-id-${this.workflowId}`)
      .getByRole('link', { name: this.workflowName });

    await workflowLink.click();

    await this.waitForWorkflowVisualizerLoad();
  }

  async createInitialTrigger(trigger: WorkflowTriggerType) {
    await this.addTriggerButton.click();

    const triggerName = this.#triggerNames[trigger];
    const createdTriggerName = this.#createdTriggerNames[trigger];

    const triggerOption = this.#page.getByText(triggerName);
    await triggerOption.click();

    await expect(this.triggerNode).toHaveClass(/selected/);
    await expect(this.triggerNode).toContainText(createdTriggerName);
  }

  async createStep(action: WorkflowActionType) {
    await this.addStepButton.click();

    const actionName = this.#actionNames[action];
    const createdActionName = this.#createdActionNames[action];

    const actionToCreateOption = this.commandMenu.getByText(actionName);

    await actionToCreateOption.click();

    const createWorkflowStepResponse = await this.#page.waitForResponse(
      (response) => {
        if (!response.url().endsWith('/graphql')) {
          return false;
        }

        const requestBody = response.request().postDataJSON();

        return requestBody.operationName === 'CreateWorkflowVersionStep';
      },
    );

    const createWorkflowStepResponseBody =
      await createWorkflowStepResponse.json();
    const createdStepId =
      createWorkflowStepResponseBody.data.createWorkflowVersionStep.id;

    const createdActionNode = this.#page
      .locator('.react-flow__node.selected')
      .getByText(createdActionName);

    await expect(createdActionNode).toBeVisible();

    const selectedNodes = this.#page.locator('.react-flow__node.selected');

    await expect(selectedNodes).toHaveCount(1);

    return {
      createdStepId,
    };
  }

  getStepNode(stepId: string) {
    return this.#page.getByTestId(`rf__node-${stepId}`);
  }

  getDeleteNodeButton(nodeLocator: Locator) {
    return nodeLocator.getByRole('button');
  }

  getAllStepNodes() {
    return this.#page
      .getByTestId(/^rf__node-.+$/)
      .and(this.#page.getByTestId(/^((?!rf__node-trigger).)*$/))
      .and(
        this.#page.getByTestId(/^((?!rf__node-branch-\d+__create-step).)*$/),
      );
  }

  async deleteStep(stepId: string) {
    const stepNode = this.getStepNode(stepId);

    await stepNode.click();

    await Promise.all([
      expect(stepNode).not.toBeVisible(),
      this.#page.waitForResponse((response) => {
        if (!response.url().endsWith('/graphql')) {
          return false;
        }

        const requestBody = response.request().postDataJSON();

        return (
          requestBody.operationName === 'DeleteWorkflowVersionStep' &&
          requestBody.variables.input.stepId === stepId
        );
      }),

      this.getDeleteNodeButton(stepNode).click(),
    ]);
  }

  async deleteTrigger() {
    await this.triggerNode.click();

    await Promise.all([
      expect(this.triggerNode).toContainText('Add a Trigger'),
      this.#page.waitForResponse((response) => {
        if (!response.url().endsWith('/graphql')) {
          return false;
        }

        const requestBody = response.request().postDataJSON();

        return (
          requestBody.operationName === 'UpdateOneWorkflowVersion' &&
          requestBody.variables.input.trigger === null
        );
      }),

      this.getDeleteNodeButton(this.triggerNode).click(),
    ]);
  }

  async closeSidePanel() {
    const closeButton = this.#page.getByRole('button', {
      name: 'Close command menu',
    });

    await closeButton.click();

    await expect(this.#page.getByTestId('command-menu')).not.toBeVisible();
  }
}

export const test = base.extend<{ workflowVisualizer: WorkflowVisualizerPage }>(
  {
    workflowVisualizer: async ({ page }, use) => {
      const workflowVisualizer = new WorkflowVisualizerPage({
        page,
        workflowName: 'Test Workflow',
      });

      await workflowVisualizer.createOneWorkflow();
      await workflowVisualizer.goToWorkflowVisualizerPage();

      await use(workflowVisualizer);

      await deleteWorkflow({
        page,
        workflowId: workflowVisualizer.workflowId,
      });
      await destroyWorkflow({
        page,
        workflowId: workflowVisualizer.workflowId,
      });
    },
  },
);
