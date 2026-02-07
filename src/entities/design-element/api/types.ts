/**
 * Raw API shapes for design elements.
 * Decoupled from domain types so backend contract changes don't leak into the UI.
 */

export type DesignElementRaw = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly label: string;
  readonly created_by: number;
  readonly last_updated_by: number;
  readonly created_at: string;
  readonly last_updated_at: string;
};
