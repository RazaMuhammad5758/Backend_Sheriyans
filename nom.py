# Muhammad noman
import numpy as np

# Define the matrix
A = np.array([[1, 0, 1],
              [3, 2, 4]])

# Compute SVD using numpy
U, S, Vt = np.linalg.svd(A)

# Create the Sigma matrix with proper dimensions
Sigma = np.zeros((2, 3))
Sigma[:2, :2] = np.diag(S)

print("U matrix:")
print(U)
print("\nSingular values (Σ diagonal):")
print(S)
print("\nV transpose matrix:")
print(Vt)

# Reconstruct the matrix
reconstructed_A = U @ Sigma @ Vt
print("\nReconstructed matrix:")
print(reconstructed_A)