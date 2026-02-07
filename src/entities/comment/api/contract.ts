/**
 * Single source of truth for design element API method names.
 *
 * Service, mapper, and mock handlers all `satisfies` this contract,
 * so adding or removing a method here triggers compile errors
 * in every layer that hasn't been updated.
 */
export type CommentApiContract = {
  readonly getAll: unknown;
};
