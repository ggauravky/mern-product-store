import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const navBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");
	const shadow = useColorModeValue("md", "dark-lg");

	return (
		<MotionFlex
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 100 }}
			position="sticky"
			top={0}
			zIndex={10}
			bg={navBg}
			backdropFilter="blur(10px)"
			shadow={shadow}
			mb={8}
		>
			<Container maxW={"1140px"} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
					flexDir={{
						base: "column",
						sm: "row",
					}}
				>
					<Link to={"/"}>
						<Text
							fontSize={{ base: "24", sm: "32" }}
							fontWeight={"extrabold"}
							textTransform={"uppercase"}
							textAlign={"center"}
							bgGradient={"linear(to-r, cyan.400, blue.500, purple.500)"}
							bgClip={"text"}
							_hover={{ bgGradient: "linear(to-r, purple.500, blue.500, cyan.400)" }}
							transition="all 0.3s"
						>
							Product Store 🛒
						</Text>
					</Link>

					<HStack spacing={3} alignItems={"center"}>
						<Link to={"/create"}>
							<MotionButton
								colorScheme="blue"
								variant="solid"
								leftIcon={<PlusSquareIcon />}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Create
							</MotionButton>
						</Link>
						<MotionButton
							onClick={toggleColorMode}
							variant="ghost"
							whileHover={{ scale: 1.1, rotate: 180 }}
							whileTap={{ scale: 0.9 }}
							transition={{ duration: 0.3 }}
						>
							{colorMode === "light" ? <IoMoon size="20" /> : <LuSun size="20" />}
						</MotionButton>
					</HStack>
				</Flex>
			</Container>
		</MotionFlex>
	);
};
export default Navbar;
