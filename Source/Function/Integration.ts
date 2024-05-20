/**
 * @module Integration
 *
 */
export default ((...[_Option = {}]: Parameters<Interface>) => {
	for (const Option in _Option) {
		if (
			Object.prototype.hasOwnProperty.call(_Option, Option) &&
			_Option[Option] === true
		) {
			_Option[Option] = Default[Option as keyof typeof Default];
		}
	}

	const { Path } = Merge(Default, _Option);

	const Paths = new Set<Path>();

	if (typeof Path !== "undefined") {
		if (Array.isArray(Path) || Path instanceof Set) {
			for (const _Path of Path) {
				Paths.add(_Path);
			}
		}
	}

	return {
		name: "@playform/remove",
		hooks: {
			"astro:build:done": ({ dir }) => {
				if (Paths.size === 0) {
					Paths.add(dir);
				}
			},
		},
	};
}) satisfies Interface as Interface;

import type Interface from "../Interface/Integraton.js";
import type Path from "@playform/pipe/Target/Type/Path.js";

export const { default: Default } = await import("@Variable/Option.js");

export const { default: Merge } = await import(
	"@playform/build/Target/Function/Merge.js"
);
