import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product";
import { useState } from "react";

const MotionBox = motion(Box);

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const bg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<MotionBox
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.9 }}
			whileHover={{ y: -8, transition: { duration: 0.2 } }}
			shadow='lg'
			rounded='xl'
			overflow='hidden'
			transition='all 0.3s'
			bg={bg}
			borderWidth="1px"
			borderColor={borderColor}
			position="relative"
		>
			<Box position="relative" overflow="hidden">
				<MotionBox
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.4 }}
				>
					<Image
						src={product.image}
						alt={product.name}
						h={56}
						w='full'
						objectFit='cover'
					/>
				</MotionBox>
				<Badge
					position="absolute"
					top={3}
					right={3}
					colorScheme="green"
					fontSize="sm"
					px={3}
					py={1}
					rounded="full"
				>
					In Stock
				</Badge>
			</Box>

			<Box p={5}>
				<Heading as='h3' size='md' mb={2} noOfLines={1}>
					{product.name}
				</Heading>

				<Text
					fontWeight='extrabold'
					fontSize='2xl'
					bgGradient="linear(to-r, cyan.400, blue.500)"
					bgClip="text"
					mb={4}
				>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} flex={1}>
						<IconButton
							icon={<EditIcon />}
							onClick={onOpen}
							colorScheme='blue'
							variant="outline"
							w="full"
							aria-label="Edit product"
						/>
					</MotionBox>
					<MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} flex={1}>
						<IconButton
							icon={<DeleteIcon />}
							onClick={() => handleDeleteProduct(product._id)}
							colorScheme='red'
							variant="outline"
							w="full"
							aria-label="Delete product"
						/>
					</MotionBox>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay backdropFilter="blur(5px)" />

				<ModalContent
					as={motion.div}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
				>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
								focusBorderColor="blue.500"
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
								focusBorderColor="blue.500"
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
								focusBorderColor="blue.500"
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</MotionBox>
	);
};
export default ProductCard;
