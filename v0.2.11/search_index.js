var documenterSearchIndex = {"docs":
[{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"CurrentModule = Octavian","category":"page"},{"location":"getting-started/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting-started/#Multi-threaded-matrix-multiplication:-matmul!-and-matmul","page":"Getting Started","title":"Multi-threaded matrix multiplication: matmul! and matmul","text":"","category":"section"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"Octavian exports the functions matmul! and matmul, which provide multithreaded matrix multiplication in pure Julia.","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"Remember to start Julia with multiple threads with e.g. one of the following:","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"julia -t auto\njulia -t 4\nSet the JULIA_NUM_THREADS environment variable to 4 before starting Julia","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"using Octavian\n\nA = [1 2 3; 4 5 6]\n\nB = [7 8 9 10; 11 12 13 14; 15 16 17 18]\n\nC = Matrix{Int}(undef, 2, 4)\n\nmatmul!(C, A, B) # (multi-threaded) multiply A×B and store the result in C (overwriting the contents of C)\n\nC\n\nC == A * B","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"using Octavian\n\nA = [1 2 3; 4 5 6]\n\nB = [7 8 9 10; 11 12 13 14; 15 16 17 18]\n\nC = matmul(A, B) # (multi-threaded) multiply A×B and return the result\n\nC\n\nC == A * B","category":"page"},{"location":"public-api/","page":"Public API","title":"Public API","text":"CurrentModule = Octavian","category":"page"},{"location":"public-api/#Public-API","page":"Public API","title":"Public API","text":"","category":"section"},{"location":"public-api/","page":"Public API","title":"Public API","text":"Modules = [Octavian]\nPages   = [\"public-api.md\"]","category":"page"},{"location":"public-api/","page":"Public API","title":"Public API","text":"Modules = [Octavian]\nPublic = true\nPrivate = false","category":"page"},{"location":"public-api/#Octavian.matmul!-Union{Tuple{T}, Tuple{AbstractArray{T,2},AbstractArray{T,2} where T,AbstractArray{T,2} where T}} where T","page":"Public API","title":"Octavian.matmul!","text":"matmul!(C, A, B[, α, β, max_threads])\n\nCalculates C = α * A * B + β * C in place, overwriting the contents of A. It may use up to max_threads threads. It will not use threads when nested in other threaded code.\n\n\n\n\n\n","category":"method"},{"location":"public-api/#Octavian.matmul-Tuple{AbstractArray{T,2} where T,AbstractArray{T,2} where T}","page":"Public API","title":"Octavian.matmul","text":"matmul(A, B)\n\nMultiply matrices A and B.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Octavian","category":"page"},{"location":"#Octavian","page":"Home","title":"Octavian","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Octavian.jl is a multi-threaded BLAS-like library that provides pure Julia matrix multiplication on the CPU, built on top of LoopVectorization.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The source code for Octavian is available in the GitHub repository.","category":"page"},{"location":"#Related-Packages","page":"Home","title":"Related Packages","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Julia Package CPU GPU\nGaius.jl Yes No\nGemmKernels.jl No Yes\nOctavian.jl Yes No\nTullio.jl Yes Yes","category":"page"},{"location":"","page":"Home","title":"Home","text":"In general:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Octavian has the fastest CPU performance.\nGemmKernels has the fastest GPU performance.\nTullio is the most flexible.","category":"page"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"CurrentModule = Octavian","category":"page"},{"location":"internals/#Internals-(Private)","page":"Internals (Private)","title":"Internals (Private)","text":"","category":"section"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"Modules = [Octavian]\nPages   = [\"internals.md\"]","category":"page"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"Modules = [Octavian]\nPublic = false\nPrivate = true","category":"page"},{"location":"internals/#Octavian._matmul_serial!-Union{Tuple{T}, Tuple{AbstractArray{T,2},AbstractArray{T,2} where T,AbstractArray{T,2} where T,Any,Any,Any}} where T","page":"Internals (Private)","title":"Octavian._matmul_serial!","text":"matmul_serial!(C, A, B[, α = 1, β = 0])\n\nCalculates C = α * (A * B) + β * C in place.\n\nA single threaded matrix-matrix-multiply implementation. Supports dynamically and statically sized arrays.\n\nOrganizationally, matmul_serial! checks the arrays properties to try and dispatch to an appropriate implementation. If the arrays are small and statically sized, it will dispatch to an inlined multiply.\n\nOtherwise, based on the array's size, whether they are transposed, and whether the columns are already aligned, it decides to not pack at all, to pack only A, or to pack both arrays A and B.\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.divide_blocks-NTuple{4,Any}","page":"Internals (Private)","title":"Octavian.divide_blocks","text":"divide_blocks(M, Ntotal, _nspawn, W)\n\nSplits both M and N into blocks when trying to spawn a large number of threads relative to the size of the matrices.\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.find_first_acceptable-Tuple{Any,Any}","page":"Internals (Private)","title":"Octavian.find_first_acceptable","text":"findfirstacceptable(M, W)\n\nFinds first combination of Miter and Niter that doesn't make M too small while producing Miter * Niter = num_cores(). This would be awkard if there are computers with prime numbers of cores. I should probably consider that possibility at some point.\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.matmul_sizes-Tuple{Any,Any,Any}","page":"Internals (Private)","title":"Octavian.matmul_sizes","text":"Checks sizes for compatibility, and preserves the static size information if given a mix of static and dynamic sizes.\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.matmul_st_only_pack_A!-Union{Tuple{R₂}, Tuple{R₁}, Tuple{W₂}, Tuple{W₁}, Tuple{T}, Tuple{VectorizationBase.AbstractStridedPointer{T,N,C,B,R,X,O} where O<:Tuple{Vararg{Any,N}} where X<:Tuple{Vararg{Any,N}} where R where B where C where N,VectorizationBase.AbstractStridedPointer,VectorizationBase.AbstractStridedPointer,Any,Any,Any,Any,Any,Static.StaticFloat64{W₁},Static.StaticFloat64{W₂},Static.StaticFloat64{R₁},Static.StaticFloat64{R₂}}} where R₂ where R₁ where W₂ where W₁ where T","page":"Internals (Private)","title":"Octavian.matmul_st_only_pack_A!","text":"Only packs A. Primitively does column-major packing: it packs blocks of A into a column-major temporary.\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.reseet_bcache_lock!-Tuple{}","page":"Internals (Private)","title":"Octavian.reseet_bcache_lock!","text":"resetbcachelock!()\n\nCurrently not using try/finally in matmul routine, despite locking. So if it errors for some reason, you may need to manually call reset_bcache_lock!().\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.solve_block_sizes-Union{Tuple{T}, Tuple{Type{T},Any,Any,Any,Any,Any,Any,Any,Any}} where T","page":"Internals (Private)","title":"Octavian.solve_block_sizes","text":"solveblocksizes(::Type{T}, M, K, N, α, β, R₂, R₃)\n\nThis function returns iteration/blocking descriptions Mc, Kc, and Nc for use when packing both A and B.\n\nIt tries to roughly minimize the cost\n\nMKN/(Kc*W) + α * MKN/Mc + β * MKN/Nc\n\nsubject to constraints\n\nMc - M ≤ 0\nKc - K ≤ 0\nNc - N ≤ 0\nMc*Kc - L₁ₑ ≤ 0\nKc*Nc - L₂ₑ ≤ 0\n\nThat is, our constraints say that our block sizes shouldn't be bigger than the actual dimensions, and also that our packed A (Mc × Kc) should fit into the first packing cache (generally, actually the L₂, and our packed B (Kc × Nc) should fit into the second packing cache (generally the L₃).\n\nOur cost model consists of three components:\n\nCost of moving data in and out of registers. This is done (M/Mᵣ * K/Kc * N/Nᵣ) times and the cost per is (Mᵣ/W * Nᵣ).\nCost of moving strips from B pack from the low cache levels to the highest cache levels when multiplying Aₚ * Bₚ. This is done (M / Mc * K / Kc * N / Nc) times, and the cost per is proportional to (Kc * Nᵣ). α is the proportionality-constant parameter.\nCost of packing A. This is done (M / Mc * K / Kc * N / Nc) times, and the cost per is proportional to (Mc * Kc). β is the proportionality-constant parameter.\n\nAs W is a constant, we multiply the cost by W and absorb it into α and β. We drop it from the description from  here on out.\n\nIn the full problem, we would have Lagrangian, with μ < 0: f((Mc,Kc,Nc),(μ₁,μ₂,μ₃,μ₄,μ₅)) MKN/Kc + α * MKN/Mc + β * MKN/Nc - μ₁(Mc - M) - μ₂(Kc - K) - μ₃(Nc - N) - μ₄(McKc - L2) - μ₅(KcNc - L3)\n\n0 = ∂L/∂Mc = - α * MKN / Mc² - μ₁ - μ₄*Kc\n0 = ∂L/∂Kc = - MKN / Kc² - μ₂ - μ₄*Mc - μ₅*Nc\n0 = ∂L/∂Nc = - β * MKN / Nc² - μ₃ - μ₅*Kc\n0 = ∂L/∂μ₁ = M - Mc\n0 = ∂L/∂μ₂ = K - Kc\n0 = ∂L/∂μ₃ = N - Nc\n0 = ∂L/∂μ₄ = L₁ₑ - Mc*Kc\n0 = ∂L/∂μ₅ = L₂ₑ - Kc*Nc\n\nThe first 3 constraints complicate things, because they're trivially solved by setting M = Mc, K = Kc, and N = Nc. But this will violate the last two constraints in general; normally we will be on the interior of the inequalities, meaning we'd be dropping those constraints. Doing so, this leaves us with:\n\nFirst, lets just solve the cost w/o constraints 1-3\n\n0 = ∂L/∂Mc = - α * MKN / Mc² - μ₄*Kc\n0 = ∂L/∂Kc = - MKN / Kc² - μ₄*Mc - μ₅*Nc\n0 = ∂L/∂Nc = - β * MKN / Nc² - μ₅*Kc\n0 = ∂L/∂μ₄ = L₁ₑ - Mc*Kc\n0 = ∂L/∂μ₅ = L₂ₑ - Kc*Nc\n\nSolving:\n\nMc = √(L₁ₑ)*√(L₁ₑ*β + L₂ₑ*α)/√(L₂ₑ)\nKc = √(L₁ₑ)*√(L₂ₑ)/√(L₁ₑ*β + L₂ₑ*α)\nNc = √(L₂ₑ)*√(L₁ₑ*β + L₂ₑ*α)/√(L₁ₑ)\nμ₄ = -K*√(L₂ₑ)*M*N*α/(L₁ₑ^(3/2)*√(L₁ₑ*β + L₂ₑ*α))\nμ₅ = -K*√(L₁ₑ)*M*N*β/(L₂ₑ^(3/2)*√(L₁ₑ*β + L₂ₑ*α))\n\nThese solutions are indepedent of matrix size. The approach we'll take here is solving for Nc, Kc, and then finally Mc one after the other, incorporating sizes.\n\nStarting with N, we check how many iterations would be implied by Nc, and then choose the smallest value that would yield that number of iterations. This also ensures that Nc ≤ N.\n\nNiter = cld(N, √(L₂ₑ)*√(L₁ₑ*β + L₂ₑ*α)/√(L₁ₑ))\nNblock, Nrem = divrem(N, Niter)\nNblock_Nrem = Nblock + (Nrem > 0)\n\nWe have Nrem iterations of size Nblock_Nrem, and Niter - Nrem iterations of size Nblock.\n\nWe can now make Nc = Nblock_Nrem a constant, and solve the remaining three equations again:\n\n0 = ∂L/∂Mc = - α * MKN / Mc² - μ₄*Kc\n0 = ∂L/∂Kc = - MKN / Kc² - μ₄*Mc - μ₅*Ncm\n0 = ∂L/∂μ₄ = L₂ₑ - Mc*Kc\n\nyielding\n\nMc = √(L₁ₑ)*√(α)\nKc = √(L₁ₑ)/√(α)\nμ₄ = -K*M*N*√(α)/L₁ₑ^(3/2)\n\nWe proceed in the same fashion as for Nc, being sure to reapply the Kc * Nc ≤ L₂ₑ constraint:\n\nKiter = cld(K, min(√(L₁ₑ)/√(α), L₂ₑ/Nc))\nKblock, Krem = divrem(K, Ki)\nKblock_Krem = Kblock + (Krem > 0)\n\nThis leaves Mc partitioning, for which, for which we use the constraint Mc * Kc ≤ L₁ₑ to set the initial number of proposed iterations as cld(M, L₁ₑ / Kcm) for calling split_m.\n\nMbsize, Mrem, Mremfinal, Mblocks = split_m(M, cld(M, L₁ₑ / Kcm), StaticInt{W}())\n\nNote that for synchronization on B, all threads must have the same values for Kc and Nc. K and N will be equal between threads, but M may differ. By calculating Kc and Nc independently of M, this algorithm guarantees all threads are on the same page.\n\n\n\n\n\n","category":"method"},{"location":"internals/#Octavian.split_m-Tuple{Any,Any,Any}","page":"Internals (Private)","title":"Octavian.split_m","text":"split_m(M, Miters_base, W)\n\nSplits M into at most Miters_base iterations. For example, if we wish to divide 517 iterations into roughly 7 blocks using multiples of 8:\n\njulia> split_m(517, 7, 8)\n(72, 2, 69, 7)\n\nThis suggests we have base block sizes of size 72, with two iterations requiring an extra remainder of 8 ( = W), and a final block of 69 to handle the remainder. It also tells us that there are 7 total iterations, as requested.\n\njulia> 80*2 + 72*(7-2-1) + 69\n517\n\nThis is meant to specify roughly the requested amount of blocks, and return relatively even sizes.\n\nThis method is used fairly generally.\n\n\n\n\n\n","category":"method"}]
}
