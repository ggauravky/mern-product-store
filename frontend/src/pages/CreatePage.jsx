import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
	Text,
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			toast({
				title: "Error",
				description: "Please fill in all fields",
				status: "error",
				isClosable: true,
				duration: 3000,
			});
			return;
		}

		setIsLoading(true);
		const { success, message } = await createProduct(newProduct);
		setIsLoading(false);

		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
				duration: 3000,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
				duration: 3000,
			});
			setNewProduct({ name: "", price: "", image: "" });
			setTimeout(() => navigate("/"), 1500);
		}
	};

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Container maxW={"container.sm"} py={10}>
			<MotionBox
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<VStack spacing={8}>
					<Box textAlign="center">
						<Heading
							as={"h1"}
							size={"2xl"}
							bgGradient={"linear(to-r, cyan.400, blue.500, purple.500)"}
							bgClip={"text"}
							mb={2}
						>
							Create New Product
						</Heading>
						<Text color="gray.500" fontSize="lg">
							Add a new product to your store
						</Text>
					</Box>

					<Box
						w={"full"}
						bg={bgColor}
						p={8}
						rounded={"xl"}
						shadow={"2xl"}
						borderWidth="1px"
						borderColor={borderColor}
					>
						<VStack spacing={6}>
							<FormControl isRequired>
								<FormLabel fontWeight="bold">Product Name</FormLabel>
								<Input
									placeholder='Enter product name'
									name='name'
									value={newProduct.name}
									onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
									size="lg"
									focusBorderColor="blue.500"
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel fontWeight="bold">Price</FormLabel>
								<InputGroup size="lg">
									<InputLeftElement pointerEvents='none' color='gray.500' fontSize='1.2em'>
										$
									</InputLeftElement>
									<Input
										placeholder='0.00'
										name='price'
										type='number'
										value={newProduct.price}
										onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
										focusBorderColor="blue.500"
									/>
								</InputGroup>
							</FormControl>

							<FormControl isRequired>
								<FormLabel fontWeight="bold">Image URL</FormLabel>
								<Input
									placeholder='https://example.com/image.jpg'
									name='image'
									value={newProduct.image}
									onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
									size="lg"
									focusBorderColor="blue.500"
								/>
							</FormControl>

							<Button
								colorScheme='blue'
								onClick={handleAddProduct}
								w='full'
								size='lg'
								isLoading={isLoading}
								loadingText="Creating..."
								as={motion.button}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								mt={2}
							>
								Add Product
							</Button>
						</VStack>
					</Box>
				</VStack>
			</MotionBox>
		</Container>
	);
};
export default CreatePage;
