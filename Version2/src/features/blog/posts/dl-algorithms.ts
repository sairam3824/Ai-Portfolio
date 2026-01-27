export const dlAlgorithms = {
    id: "dl-algorithms",
    title: "Deep Learning Algorithms in 2025: From MLP to Transformers and GANs",
    excerpt:
      "Explore the defining deep learning algorithms—ANNs, CNNs, RNNs, LSTM, GRU, Transformers, Autoencoders, and GANs—powering breakthroughs in AI today. Includes practical explanations, use cases, and Python starter syntax for each network.",
    date: "August 26, 2025",
    readTime: "15 min read",
    tags: ["Deep Learning", "Algorithms", "Neural Networks", "AI/ML", "Python"],
    icon: "CpuChip",
    iconColor: "purple",
    content: `
    <p class="mb-4 text-lg text-gray-900">
    Deep learning algorithms are winning solutions for computer vision, language, sequential prediction, and generative creativity. In 2025, understanding and harnessing the right neural network for the job—whether it’s a classic ANN or a state-of-the-art Transformer—makes all the difference for data scientists and developers. This guide covers the big players in depth.
    </p>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">1. Artificial Neural Networks (ANNs) / Multilayer Perceptrons (MLP)</h4>
    <p class="mb-4 text-gray-700">
      The foundational architecture: a stack of fully connected layers. ANNs (MLPs) are universal function approximators, primarily used when the data is tabular or does not have spatial or sequential relations.<br>
      <strong>Best for:</strong> Tabular data, basic classification/regression, financial modeling.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Dense
    
    model = Sequential([
        Dense(128, activation='relu', input_shape=(num_features,)),
        Dense(64, activation='relu'),
        Dense(num_classes, activation='softmax')
    ])</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">2. Convolutional Neural Networks (CNNs)</h4>
    <p class="mb-4 text-gray-700">
      CNNs use convolutional layers to recognize spatial hierarchies and patterns. Their ability to learn translation-invariant features makes them the backbone of image, video, and many sensor data applications.<br>
      <strong>Best for:</strong> Image classification, detection, face recognition, medical imaging, video analysis.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
    
    model = Sequential([
      Conv2D(32, (3,3), activation='relu', input_shape=(64,64,3)),
      MaxPooling2D((2,2)),
      Flatten(),
      Dense(64, activation='relu'),
      Dense(num_classes, activation='softmax')
    ])</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">3. Recurrent Neural Networks (RNNs)</h4>
    <p class="mb-4 text-gray-700">
      RNNs introduce memory, allowing them to handle sequential inputs by sharing weights over time. They're great for modeling sequences and temporal dependencies, but can struggle with long-range information.<br>
      <strong>Best for:</strong> Time series, language modeling, speech, simple sequence prediction.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import SimpleRNN, Dense
    
    model = Sequential([
      SimpleRNN(64, input_shape=(timesteps, features)),
      Dense(num_classes, activation='softmax')
    ])</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">4. Long Short-Term Memory Networks (LSTM)</h4>
    <p class="mb-4 text-gray-700">
      LSTMs are a type of RNN built to overcome the vanishing gradient problem, using gates to control information flow. They’re suited for learning long-term dependencies.<br>
      <strong>Best for:</strong> Language translation, speech recognition, text generation, sequential prediction when context matters over long spans.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense
    
    model = Sequential([
      LSTM(128, input_shape=(timesteps, features)),
      Dense(num_classes, activation='softmax')
    ])</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">5. Gated Recurrent Units (GRU)</h4>
    <p class="mb-4 text-gray-700">
      GRUs simplify LSTMs using fewer gates, often achieving comparable performance with less computation.<br>
      <strong>Best for:</strong> Sequence tasks where computational efficiency is essential—similar to LSTMs.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import GRU, Dense
    
    model = Sequential([
      GRU(128, input_shape=(timesteps, features)),
      Dense(num_classes, activation='softmax')
    ])</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">6. Transformers (BERT, GPT, T5, Vision Transformers)</h4>
    <p class="mb-4 text-gray-700">
      Transformers rely entirely on self-attention for context, not recurrence or convolution, supporting highly parallel processing and capturing long-range dependencies. BERT and GPT revolutionized NLP, while Vision Transformers (ViT) apply the concept to images.<br>
      <strong>Best for:</strong> Language translation, summarization, code generation, question answering, document search, vision-language modeling.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from transformers import BertTokenizer, BertModel
    
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')
    
    inputs = tokenizer("Deep learning rocks!", return_tensors="pt")
    outputs = model(**inputs)</code></pre>
    <pre class="bg-gray-100 p-3 rounded"><code># Vision Transformer (ViT) using timm
    import timm
    model = timm.create_model('vit_base_patch16_224', pretrained=True)</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">7. Autoencoders</h4>
    <p class="mb-4 text-gray-700">
      Autoencoders are unsupervised networks that learn compact representations by encoding and decoding input data. Useful for noise reduction, anomaly detection, and feature compression.<br>
      <strong>Best for:</strong> Dimensionality reduction, denoising, anomaly detection.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from tensorflow.keras.layers import Input, Dense
    from tensorflow.keras.models import Model
    
    inputs = Input(shape=(784,))
    encoded = Dense(64, activation='relu')(inputs)
    decoded = Dense(784, activation='sigmoid')(encoded)
    autoencoder = Model(inputs, decoded)</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">8. Generative Adversarial Networks (GANs)</h4>
    <p class="mb-4 text-gray-700">
      GANs pit two models—a generator and a discriminator—against each other to create highly realistic synthetic data. They dominate new image/video synthesis and generative creativity.<br>
      <strong>Best for:</strong> Image/video generation, style transfer, super-resolution, deepfakes.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code>from keras.models import Sequential
    from keras.layers import Dense
    
    # Generator example
    generator = Sequential([
      Dense(128, activation='relu', input_dim=noise_dim),
      Dense(784, activation='sigmoid')
    ])
    
    # Discriminator + GAN training require custom training loops</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">9. Variational Autoencoders (VAEs)</h4>
    <p class="mb-4 text-gray-700">
      Probabilistic generative models that learn distributions in latent space; useful for representation learning and synthetic data generation.
    </p>
    <pre class="bg-gray-100 p-3 rounded"><code># VAE requires custom loss combining reconstruction + KL divergence</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">10. Graph Neural Networks (GNNs)</h4>
    <p class="mb-4 text-gray-700">
      Designed for graph-structured data; learn on nodes/edges with message-passing.
    </p>
    <pre class="bg-gray-100 p-3 mt-2 rounded"><code># PyTorch Geometric GCN example
    import torch
    import torch.nn.functional as F
    from torch_geometric.nn import GCNConv
    
    class GCN(torch.nn.Module):
        def __init__(self):
            super().__init__()
            self.conv1 = GCNConv(dataset.num_features, 16)
            self.conv2 = GCNConv(16, dataset.num_classes)
    
        def forward(self, data):
            x, edge_index = data.x, data.edge_index
            x = F.relu(self.conv1(x, edge_index))
            x = self.conv2(x, edge_index)
            return F.log_softmax(x, dim=1)</code></pre>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">11. Deep Q-Networks (DQN)</h4>
    <p class="mb-4 text-gray-700">
      Combine deep learning with Q-learning for reinforcement learning in high-dimensional spaces — used in game AI, robotics, and control tasks.
    </p>
    
    text
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Summary Table: Deep Learning Architectures</h4>
    <table class="w-full mt-4 mb-8 text-sm border">
      <thead>
        <tr>
          <th class="font-semibold text-left px-2 py-1 bg-gray-100">Algorithm Family</th>
          <th class="font-semibold text-left px-2 py-1 bg-gray-100">Primary Use</th>
          <th class="font-semibold text-left px-2 py-1 bg-gray-100">Starter Syntax</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-2 py-1">MLP</td>
          <td class="px-2 py-1">Tabular/classic ML</td>
          <td class="px-2 py-1">Dense()</td>
        </tr>
        <tr>
          <td class="px-2 py-1">CNN</td>
          <td class="px-2 py-1">Vision</td>
          <td class="px-2 py-1">Conv2D()</td>
        </tr>
        <tr>
          <td class="px-2 py-1">RNN/LSTM/GRU</td>
          <td class="px-2 py-1">Sequences</td>
          <td class="px-2 py-1">SimpleRNN/LSTM/GRU()</td>
        </tr>
        <tr>
          <td class="px-2 py-1">Transformer</td>
          <td class="px-2 py-1">NLP & multimodal</td>
          <td class="px-2 py-1">HuggingFace</td>
        </tr>
        <tr>
          <td class="px-2 py-1">Autoencoder/VAE</td>
          <td class="px-2 py-1">Compression/generative</td>
          <td class="px-2 py-1">Model()</td>
        </tr>
        <tr>
          <td class="px-2 py-1">GAN</td>
          <td class="px-2 py-1">Synthetic data</td>
          <td class="px-2 py-1">Custom</td>
        </tr>
        <tr>
          <td class="px-2 py-1">GNN</td>
          <td class="px-2 py-1">Graph tasks</td>
          <td class="px-2 py-1">GCNConv()</td>
        </tr>
        <tr>
          <td class="px-2 py-1">DQN</td>
          <td class="px-2 py-1">RL</td>
          <td class="px-2 py-1">Custom</td>
        </tr>
      </tbody>
    </table>
    
    <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Further Reading & Conclusion</h4>
    <p class="mb-8 text-gray-700">
      The deep learning algorithm ecosystem is large and fast-evolving, but understanding these key families gives you a solid toolkit for almost any AI task in 2025. Start with templates, then adapt architecture depth and hyperparameters to fit your data.
    </p>
    
    <details class="mb-8 border border-gray-200 rounded-lg">
      <summary class="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">
        Sources & References
      </summary>
      <div class="p-4 space-y-3">
        <div class="grid gap-3">
          <a href="https://www.geeksforgeeks.org/deep-learning/top-deep-learning-algorithms/" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Top 10 Deep Learning Algorithms – GeeksforGeeks</a>
          <a href="https://www.simplilearn.com/tutorials/deep-learning-tutorial/deep-learning-algorithm" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Top 10 DL Algorithms – Simplilearn</a>
          <a href="https://digitaldefynd.com/IQ/machine-learning-vs-deep-learning/" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">Machine Learning vs. Deep Learning – DigitalDefynd</a>
        </div>
      </div>
    </details>
    
    <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
      <div class="space-y-4">
        <p class="text-gray-700 text-base leading-relaxed">
          Which deep learning models have you used most? Want hands-on code for one of these or project tips? Ask anytime!
        </p>
        <div class="space-y-2">
          <p class="text-gray-700">Until next time,</p>
          <p class="text-gray-900 font-medium italic">Sairam Maruri</p>
        </div>
      </div>
    </div>
    
    <div class="mt-6 text-sm text-gray-500">
      <p>Note: This article includes AI-assisted writing and manual curation. Use at your own risk.</p>
    </div>
    `
  };
  