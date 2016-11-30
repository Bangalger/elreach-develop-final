-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2016 a las 16:33:29
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elreach`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id`, `name`) VALUES
(1, 'Nivel 1'),
(2, 'Nivel 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels_teams`
--

CREATE TABLE `levels_teams` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `status` enum('completed','uncompleted') NOT NULL,
  `movements` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `levels_teams`
--

INSERT INTO `levels_teams` (`id`, `team_id`, `level_id`, `status`, `movements`) VALUES
(1, 1, 1, 'uncompleted', 0),
(2, 2, 1, 'uncompleted', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `phinxlog`
--

CREATE TABLE `phinxlog` (
  `version` bigint(20) NOT NULL,
  `migration_name` varchar(100) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `phinxlog`
--

INSERT INTO `phinxlog` (`version`, `migration_name`, `start_time`, `end_time`) VALUES
(20161022151015, 'CreateUsersTable', '2016-11-17 02:10:30', '2016-11-17 02:10:30'),
(20161026021137, 'CreateTeams', '2016-11-17 02:10:30', '2016-11-17 02:10:31'),
(20161026021139, 'CreateTeamsUsers', '2016-11-17 02:10:31', '2016-11-17 02:10:32'),
(20161026025107, 'CreateLevels', '2016-11-17 02:10:32', '2016-11-17 02:10:32'),
(20161026025436, 'CreateLevelsTeams', '2016-11-17 02:10:33', '2016-11-17 02:10:33'),
(20161026030246, 'CreateWarnings', '2016-11-17 02:10:33', '2016-11-17 02:10:33'),
(20161026030247, 'CreateTeamsWarningsLevels', '2016-11-17 02:10:33', '2016-11-17 02:10:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `points` int(11) NOT NULL,
  `turn` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `teams`
--

INSERT INTO `teams` (`id`, `name`, `status`, `points`, `turn`) VALUES
(1, 'La promocion', 'active', 0, 0),
(2, 'Animes', 'active', 0, 0),
(3, 'El gato loco', 'active', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams_users`
--

CREATE TABLE `teams_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `teams_users`
--

INSERT INTO `teams_users` (`id`, `user_id`, `team_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 2),
(5, 4, 3),
(6, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams_warnings_levels`
--

CREATE TABLE `teams_warnings_levels` (
  `id` int(11) NOT NULL,
  `warning_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_name`, `password`, `points`) VALUES
(1, 'Juanma', 'Migliore', 'juanmamig', 'juanmamig', 0),
(2, 'German', 'Figueroa', 'geerman', 'geerman', 0),
(3, 'Nacho', 'Romero', 'nachoromero', 'nachoromero', 0),
(4, 'Tom', 'Buccino', 'tombuccino', 'tombuccino', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `warnings`
--

CREATE TABLE `warnings` (
  `id` int(11) NOT NULL,
  `posX` int(11) NOT NULL,
  `posY` int(11) NOT NULL,
  `tile` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `levels_teams`
--
ALTER TABLE `levels_teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `phinxlog`
--
ALTER TABLE `phinxlog`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `teams_users`
--
ALTER TABLE `teams_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indices de la tabla `teams_warnings_levels`
--
ALTER TABLE `teams_warnings_levels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warning_id` (`warning_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `warnings`
--
ALTER TABLE `warnings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `levels_teams`
--
ALTER TABLE `levels_teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `teams_users`
--
ALTER TABLE `teams_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `teams_warnings_levels`
--
ALTER TABLE `teams_warnings_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `warnings`
--
ALTER TABLE `warnings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `levels_teams`
--
ALTER TABLE `levels_teams`
  ADD CONSTRAINT `levels_teams_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `levels_teams_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `teams_users`
--
ALTER TABLE `teams_users`
  ADD CONSTRAINT `teams_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `teams_users_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `teams_warnings_levels`
--
ALTER TABLE `teams_warnings_levels`
  ADD CONSTRAINT `teams_warnings_levels_ibfk_1` FOREIGN KEY (`warning_id`) REFERENCES `warnings` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `teams_warnings_levels_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `teams_warnings_levels_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
