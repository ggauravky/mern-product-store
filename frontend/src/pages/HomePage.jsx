import { Container, SimpleGrid, Text, VStack, Spinner, Box, Icon, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { PlusSquareIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadProducts = async () => {
			setIsLoading(true);
			await fetchProducts();
			setIsLoading(false);
		};
		loadProducts();
	}, [fetchProducts]);

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<MotionBox
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Text
						fontSize={{ base: "28", md: "36" }}
						fontWeight={"extrabold"}
						bgGradient={"linear(to-r, cyan.400, blue.500, purple.500)"}
						bgClip={"text"}
						textAlign={"center"}
					>
						Current Products 🚀
					</Text>
				</MotionBox>

				{isLoading ? (
					<VStack spacing={4} py={20}>
						<Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
						<Text color="gray.500" fontSize="lg">
							Loading products...
						</Text>
					</VStack>
				) : (
					<AnimatePresence>
						{products.length > 0 ? (
							<MotionSimpleGrid
								columns={{
									base: 1,
									md: 2,
									lg: 3,
								}}
								spacing={10}
								w={"full"}
								variants={containerVariants}
								initial="hidden"
								animate="show"
							>
								{products.map((product) => (
									<MotionBox key={product._id} variants={itemVariants}>
										<ProductCard product={product} />
									</MotionBox>
								))}
							</MotionSimpleGrid>
						) : (
							<MotionBox
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								textAlign="center"
								py={20}
							>
								<VStack spacing={6}>
									<Text fontSize="6xl">📦</Text>
									<Text fontSize='2xl' fontWeight='bold' color='gray.600'>
										No products found
									</Text>
									<Text fontSize='lg' color='gray.500'>
										Get started by creating your first product!
									</Text>
									<Link to={"/create"}>
										<Button
											colorScheme='blue'
											size='lg'
											leftIcon={<PlusSquareIcon />}
											as={motion.button}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											Create Product
										</Button>
									</Link>
								</VStack>
							</MotionBox>
						)}
					</AnimatePresence>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
