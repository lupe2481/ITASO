CREATE TABLE `reward_points` (
	`id` text PRIMARY KEY NOT NULL,
	`profile` text NOT NULL,
	`points` integer NOT NULL,
	`source` text NOT NULL,
	`created` text NOT NULL,
	FOREIGN KEY (`profile`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reward_points_profile` ON `reward_points` (`profile`);