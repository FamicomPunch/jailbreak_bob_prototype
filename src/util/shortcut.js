export function addGroup (game, name) {
	let group = game.add.group(
		game.world, name, false, false, game.world.physicsType
	);

	return group;
}
