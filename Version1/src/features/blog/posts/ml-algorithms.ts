export const mlAlgorithms = { 
    id: "ml-algorithms",
    title: "All Major Machine Learning Algorithms (2025): The Ultimate Guide to Paradigms, and Algorithms",
    excerpt:
      "Explore every major class of machine learning algorithms in 2025: supervised, unsupervised, semi-supervised, and reinforcement learning. This in-depth post lists all top algorithms in each paradigm and provides practical Python syntax to help you get started.",
    date: "August 25, 2025",
    readTime: "17 min read",
    tags: ["AI/ML", "Machine Learning", "Algorithms", "Python", "Data Science"],
    icon: "Chip",
    iconColor: "blue",
    content: `
  <p class="mb-4 text-lg text-gray-900">
  Machine learning (ML) is a cornerstone of artificial intelligence, enabling models to learn from data and make predictions or decisions. In 2025, understanding the four main types of learning paradigms—supervised, unsupervised, semi-supervised, and reinforcement learning—is crucial for developing effective AI solutions. This post explains each paradigm and provides Python code snippets illustrating popular algorithms used today.
  </p>
  
  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Supervised Learning Algorithms</h4>
  <p class="mb-4 text-gray-700">
    <strong>Supervised learning</strong> uses labeled data to learn a mapping from input to output. Typical tasks: classification and regression.
  </p>
  <ul class="mb-4 text-gray-700 list-disc list-inside space-y-2">
    <li><strong>Regression Algorithms:</strong>
      <ul class="list-disc ml-6">
        <li>Linear Regression</li>
        <li>Ridge Regression</li>
        <li>Lasso Regression</li>
        <li>Elastic Net Regression</li>
        <li>Support Vector Regression (SVR)</li>
        <li>Decision Tree Regression</li>
        <li>Random Forest Regression</li>
        <li>Gradient Boosting Regression (XGBoost, LightGBM, CatBoost)</li>
        <li>K-Nearest Neighbors Regression</li>
      </ul>
    </li>
    <li><strong>Classification Algorithms:</strong>
      <ul class="list-disc ml-6">
        <li>Logistic Regression</li>
        <li>Naive Bayes (Gaussian, Multinomial, Bernoulli)</li>
        <li>Support Vector Machines (SVM)</li>
        <li>Decision Trees</li>
        <li>Random Forest</li>
        <li>Gradient Boosting (XGBoost, LightGBM, CatBoost, AdaBoost, etc.)</li>
        <li>K-Nearest Neighbors (KNN)</li>
        <li>Neural Networks (MLP, Deep Learning)</li>
      </ul>
    </li>
    <li><strong>Ensemble Methods (often supervised):</strong>
      <ul class="list-disc ml-6">
        <li>Bagging (Bootstrap Aggregating)</li>
        <li>Boosting (XGBoost, LightGBM, CatBoost, AdaBoost)</li>
        <li>Stacking</li>
        <li>Voting Classifier</li>
      </ul>
    </li>
  </ul>
  
  <h5 class="text-lg font-semibold text-gray-900 mb-2 mt-6">Python Example: Random Forest Classifier</h5>
  <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>from sklearn.ensemble import RandomForestClassifier
  model = RandomForestClassifier(n_estimators=100)
  model.fit(X_train, y_train)
  preds = model.predict(X_test)</code></pre>
  
  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Unsupervised Learning Algorithms</h4>
  <p class="mb-4 text-gray-700">
    <strong>Unsupervised learning</strong> discovers hidden patterns and structures in unlabeled data. Typical tasks: clustering, dimensionality reduction, association.
  </p>
  <ul class="mb-4 text-gray-700 list-disc list-inside space-y-2">
    <li><strong>Clustering:</strong>
      <ul class="list-disc ml-6">
        <li>K-Means</li>
        <li>Hierarchical (Agglomerative/Divisive)</li>
        <li>DBSCAN</li>
        <li>OPTICS</li>
        <li>Affinity Propagation</li>
        <li>Gaussian Mixture Models (Expectation Maximization)</li>
        <li>BIRCH</li>
      </ul>
    </li>
    <li><strong>Dimensionality Reduction:</strong>
      <ul class="list-disc ml-6">
        <li>Principal Component Analysis (PCA)</li>
        <li>Linear Discriminant Analysis (LDA)</li>
        <li>Independent Component Analysis (ICA)</li>
        <li>t-Distributed Stochastic Neighbor Embedding (t-SNE)</li>
        <li>Isomap</li>
        <li>Locally Linear Embedding (LLE)</li>
        <li>Autoencoders (Neural Networks)</li>
      </ul>
    </li>
    <li><strong>Association Rule Mining:</strong>
      <ul class="list-disc ml-6">
        <li>Apriori</li>
        <li>FP-Growth</li>
        <li>ECLAT</li>
      </ul>
    </li>
  </ul>
  
  <h5 class="text-lg font-semibold text-gray-900 mb-2 mt-6">Python Example: K-Means Clustering</h5>
  <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>from sklearn.cluster import KMeans
  model = KMeans(n_clusters=3, random_state=42)
  model.fit(X)
  labels = model.labels_</code></pre>
  

  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Semi-Supervised Learning Algorithms</h4>
  <p class="mb-4 text-gray-700">
    <strong>Semi-supervised learning</strong> uses both a small amount of labeled data and a large amount of unlabeled data. This approach is useful when labels are costly or rare.
  </p>
  <ul class="mb-4 text-gray-700 list-disc list-inside space-y-2">
    <li>Label Propagation</li>
    <li>Label Spreading</li>
    <li>Semi-supervised SVM</li>
    <li>Self-training (pseudo-labeling)</li>
    <li>Graph-based Methods</li>
    <li>Co-training</li>
    <li>Transductive SVM (TSVM)</li>
  </ul>
  
  <h5 class="text-lg font-semibold text-gray-900 mb-2 mt-6">Python Example: Label Propagation</h5>
  <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>from sklearn.semi_supervised import LabelPropagation
  model = LabelPropagation()
  model.fit(X, y) # y contains -1 for unlabeled entries</code></pre>
  

  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Reinforcement Learning Algorithms</h4>
  <p class="mb-4 text-gray-700">
    <strong>Reinforcement learning</strong> lets agents interact with environments, learning optimal strategies via trial, error, and rewards.
  </p>
  <ul class="mb-4 text-gray-700 list-disc list-inside space-y-2">
    <li>Q-Learning</li>
    <li>SARSA</li>
    <li>Deep Q-Networks (DQN)</li>
    <li>Policy Gradient Methods (REINFORCE, Actor-Critic, A3C, PPO)</li>
    <li>Monte Carlo Methods</li>
    <li>Temporal Difference (TD) Learning</li>
    <li>TD(λ)</li>
    <li>Double DQN</li>
    <li>Deep Deterministic Policy Gradient (DDPG)</li>
    <li>Trust Region Policy Optimization (TRPO)</li>
  </ul>
  
  <h5 class="text-lg font-semibold text-gray-900 mb-2 mt-6">Python Example: Q-Learning Skeleton</h5>
  <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code># initialize Q-table: Q[state, action]
  import numpy as np
  Q = np.zeros((num_states, num_actions))
  
  for episode in range(episodes):
      state = env.reset()
      done = False
      while not done:
          action = np.argmax(Q[state]) if np.random.uniform() > epsilon else env.action_sample()
          next_state, reward, done, _ = env.step(action)
          Q[state, action] += alpha * (reward + gamma * np.max(Q[next_state]) - Q[state, action])
          state = next_state</code></pre>
  

  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Deep Learning Algorithms (Cutting-Edge)</h4>
  <p class="mb-4 text-gray-700">
    Many deep learning models are used in supervised, unsupervised, and RL contexts:
  </p>
  <ul class="mb-4 text-gray-700 list-disc list-inside space-y-2">
    <li>Artificial Neural Networks (ANNs / MLP)</li>
    <li>Convolutional Neural Networks (CNNs)</li>
    <li>Recurrent Neural Networks (RNNs)</li>
    <li>Long Short-Term Memory Networks (LSTM)</li>
    <li>Gated Recurrent Units (GRU)</li>
    <li>Transformers (BERT, GPT, T5, vision transformers)</li>
    <li>Autoencoders (for unsupervised/representation learning)</li>
    <li>Generative Adversarial Networks (GANs)</li>
  </ul>
  <p class="text-blue-600 font-medium mt-2">
  See full blog post at <a href="/dl-algorithms" class="underline hover:text-blue-800">dl-algorithms</a>
  </p>
  
  <h5 class="text-lg font-semibold text-gray-900 mb-2 mt-6">Python Example: MLP Classifier</h5>
  <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>from sklearn.neural_network import MLPClassifier
  model = MLPClassifier(hidden_layer_sizes=(100, 50))
  model.fit(X_train, y_train)
  preds = model.predict(X_test)</code></pre>
  
  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Quick Table: Algorithms by Paradigm</h4>
  <table class="w-full mt-4 mb-8 text-sm">
    <thead>
      <tr>
        <th class="font-semibold text-left px-2 py-1 bg-gray-100">Paradigm</th>
        <th class="font-semibold text-left px-2 py-1 bg-gray-100">Key Algorithms</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="px-2 py-1 font-medium">Supervised</td>
        <td class="px-2 py-1">
          Linear/Logistic Regression, SVM, Decision Tree, Random Forest, KNN,
          Naive Bayes, Gradient Boosting, Neural Nets, Ridge/Lasso/ElasticNet,
          SVR, GBTs
        </td>
      </tr>
      <tr>
        <td class="px-2 py-1 font-medium">Unsupervised</td>
        <td class="px-2 py-1">
          K-Means, Hierarchical, DBSCAN, OPTICS, PCA, t-SNE, ICA, LDA, GMM,
          Isomap, Apriori, FP-Growth, ECLAT, Autoencoders
        </td>
      </tr>
      <tr>
        <td class="px-2 py-1 font-medium">Semi-Supervised</td>
        <td class="px-2 py-1">
          Label Propagation, Label Spreading, Self-training, Graph-based,
          Co-training, TSVM
        </td>
      </tr>
      <tr>
        <td class="px-2 py-1 font-medium">Reinforcement</td>
        <td class="px-2 py-1">
          Q-Learning, SARSA, DQN, Policy Gradient, Monte Carlo, TD-Learning,
          Actor-Critic, PPO, A3C
        </td>
      </tr>
      <tr>
        <td class="px-2 py-1 font-medium">Deep Learning</td>
        <td class="px-2 py-1">
          MLP, CNN, RNN, LSTM, GRU, Transformers, GAN, Autoencoder
        </td>
      </tr>
    </tbody>
  </table>
  
  <h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">References and More Reading</h4>
  <details class="mb-8 border border-gray-200 rounded-lg">
    <summary class="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">
      Sources & References
    </summary>
    <div class="p-4 space-y-3">
      <div class="grid gap-3">
        <a
          href="https://www.coursera.org/in/articles/machine-learning-algorithms"
          class="text-blue-600 hover:text-blue-800 underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Machine Learning Algorithms to Know in 2025 – Coursera
        </a>
        <a
          href="https://www.geeksforgeeks.org/machine-learning/machine-learning-algorithms/"
          class="text-blue-600 hover:text-blue-800 underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Machine Learning Algorithms – GeeksforGeeks
        </a>
        <a
          href="https://tutedude.com/blogs/10-must-know-machine-learning-algorithms/"
          class="text-blue-600 hover:text-blue-800 underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Top 10 ML Algorithms for 2025 – Tutedude
        </a>
        <a
          href="https://www.techmixing.com/2025/10/types-of-machine-learning-algorithms-a-complete-guide-2025.html"
          class="text-blue-600 hover:text-blue-800 underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Types of Machine Learning Algorithms – Techmixing
        </a>
      </div>
    </div>
  </details>
  
  <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
    <div class="space-y-4">
      <p class="text-gray-700 text-base leading-relaxed">
        Which ML family are you most interested in? Want implementation tips for a specific algorithm? Let me know, and I can share more hands-on examples or project advice!
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
  